import * as React from 'react';
import Sidebar from './Sidebar';
import { Box, Typography, Fab } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Divider from '@mui/material/Divider';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import SavingsProgress from './LinearProgress';

export default function Savings() {
    return (
        <Box className='window'>
            <Sidebar />
            <Box className='main-content' sx={{
                display: 'flex', flexDirection: 'row',
                width: '100%'}}>
                <Box sx={{width: '50%', height: '100%', m: 3}}>
                    <p>box 1</p>
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box sx={{width: '50%', height: '100%', m: 3, overflowY: 'auto'}}>
                    <Typography variant='h4' sx={{mb: 3}}>I tuoi obiettivi</Typography>
                    { /* TODO qui generare la lista a partire dall'array dei savings */}
                    <Typography variant='h6'>Vacanze</Typography>
                    <SavingsProgress value={50}/>
                    <Typography variant='body1'>currentValue / totalValue</Typography>
                    { /* TODO aggiustare l'hover dei FAB */}
                    <Fab color='savings' sx={{
                                position: 'absolute',
                                top: '77vh',
                            }}>
                        <PercentRoundedIcon />
                    </Fab>
                    <Fab color='savings' sx={{
                                position: 'absolute',
                                top: '87vh'
                            }}>
                        <AddRoundedIcon />
                    </Fab>
                </Box>
            </Box>
        </Box>
    );
}