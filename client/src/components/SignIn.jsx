import * as React from 'react';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {useNavigate, NavLink} from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';

const baseURL = 'https://assetflow-backend.onrender.com'

export default function SignIn({verify}) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.history.pushState(null, '', '/login');

        const handleBackButton = (event) => {
            event.preventDefault();
            window.history.pushState(null, '', '/login');
        };

        window.addEventListener('popstate', handleBackButton);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setLoading(true);
        fetch(`${baseURL}/api/user/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password')
            }),
        }).then((response) => response.json()).then((data) => {
            verify(data.success);
            if (!data.success) {
                alert("Email o password incorretti")
                setLoading(false);
            } else {
                window.localStorage.setItem("token", data.token) //Salvo il token in local storage
                navigate('/', {replace: true})
            }
        }).catch(e => {
            console.log(e)
        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: '#009b7e'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <LoadingButton
                        type="submit"
                        fullWidth
                        loading={loading}
                        variant="contained"
                        sx={{mt: 3, mb: 2, bgcolor: '#009b7e'}}
                    >
                        Accedi
                    </LoadingButton>
                    <Grid container>
                        <Grid item>
                            <NavLink to='/signup' style={{color: '#009b7e'}}
                            variant="body2">
                                {"Non hai un account? Registrati"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}