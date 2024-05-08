import * as React from 'react';
import Sidebar from './Sidebar';
import { Box, Button, CardContent, Grid, Card } from '@mui/material';
import BasicLineChart from './LineChart';

export default function Expense() {
    return (
        <Box className='window'>
            <Sidebar />
            <Box className='main-content'>
                <Grid container display='flex' flexDirection='row' alignItems='stretch'>
                    <Grid item xs={12}>
                        <Box sx={{display: 'flex', 
                        flexDirection: 'row', 
                        gap: '1rem',
                        mt: '1rem',
                        ml: '2rem'
                        }}>
                            <Button variant='outlined'>
                                Portafogli
                            </Button>
                            <Button variant='outlined'>
                                Watchlist
                            </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <BasicLineChart />
                            <Card sx={{
                                display: 'flex',
                                width: '100%',
                                height: '100%',
                                margin: '1rem'
                            }}>
                                <Box sx={{width: '100%', display: 'flex', 
                                flexDirection: 'column', alignItems: 'flex-center', 
                                bgcolor: '#dbdbdb'}}>
                                    <CardContent>
                                        <p>Notizie</p>
                                    </CardContent>
                                </Box>
                            </Card>
                        </Box>
                        
                    </Grid>
                    <Grid item xs={6}>
                        <Box>
                        <p>assets</p>
                        </Box>
                        
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}