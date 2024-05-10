import * as React from 'react';
import Sidebar from './Sidebar';
import { Box, Fab, Grid, List, ListItem, ListItemButton } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import BasicLineChart from './LineChart';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from "react";
import getApi from '../utils/api.utils';

export default function Asset() {

    const [assetList, setAssetList] = useState([])
    useEffect(() => {
        getApi('asset/').then((data) => {
            setAssetList(data);
        })
    })
    
    return (
        <Box className='window'>
            <Sidebar />
            <Box className='main-content'>
                <Grid container display='flex' flexDirection='row' alignItems='stretch'>
                    <Grid item xs={12}>
                        <Box sx={{ 
                            width: '100%',
                            textAlign: 'center',
                            mt: '1rem',
                            mb: '4rem'
                        }}>
                            <h2>Nome Asset</h2>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                       <BasicLineChart /> 
                    </Grid>
                    <Grid item xs={6} display='flex' flexWrap='wrap' justifyContent='center'>
                        <Box sx={{
                            width: '80%',
                            height: '100%',
                            bgcolor: '#eaeaea',
                            borderRadius: '20px',
                            alignSelf: 'center',
                            textAlign: 'center',
                            padding: '0.5rem',
                            overflowY: 'scroll'
                        }}>
                            <h3>I tuoi asset</h3>
                            <List>
                            {  /* assetList.map((asset) => {
                                <ListItem
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon />
                                        </IconButton>
                                    
                                    
                                    <ListItemButton>
                                    <ListItemText
                                        primary='prova'
                                    />
                                    </ListItemButton>
                                </ListItem>
                            
                                */
                            }
                            </List>

                            <Fab color='primary' sx={{
                                position: 'absolute',
                                top: '71%',
                                left: '91%'
                            }}>
                            <AddIcon />
                            </Fab>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}