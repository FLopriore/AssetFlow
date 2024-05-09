import * as React from 'react';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';

export default function Savings() {
    return (
        <Box className='outerbox'>
            <Sidebar />
            <Box className='innerbox'>
                    <p>Questo è un placeholder per la sezione "Salvadanaio"</p>
            </Box>
        </Box>
    );
}