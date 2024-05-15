import Sidebar from "./Sidebar.jsx";
import * as React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {Box} from '@mui/material';

export default function Loading({color}) {
    return (
        <>
            <Box className='window'>
                <Sidebar/>
                <Box className='main-content' sx={{
                    border: '3px solid',
                    borderColor: {color},
                    margin: '1rem',
                    borderRadius: '20px',
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress sx={{color: color}}/>
                </Box>
            </Box>
        </>
    );
}