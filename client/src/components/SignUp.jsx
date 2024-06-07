import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate, NavLink } from 'react-router-dom';

const baseURL = 'https://assetflow-backend.onrender.com'

export default function SignUp() {

  const navigate = useNavigate()  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    fetch(`${baseURL}/api/user/signup`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.get('email'),
            password: data.get('password')
        })
    }).then((response) => response.json()).then((data) => {
        if(!data.success) {
            alert("Esiste già un utente associato a questo indirizzo email")
        } else {
            navigate('/login')
        }
    }).catch(e => {
        console.log(e)
    })
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#009b7e' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crea un account
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: '#009b7e' }}
            >
              Registrati
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <NavLink to='/login' style={{color: '#009b7e'}}
                variant="body2">
                {"Hai già un account? Accedi"}
              </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}