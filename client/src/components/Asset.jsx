import * as React from 'react';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';

export default function Expense() {
    return (
        <Box className='outerbox'>
            <Sidebar />
            <Box className='innerbox'>
                    <p>Questo è un placeholder per la sezione "Trading"</p>
            </Box>
        </Box>
    );
}