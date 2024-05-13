import * as React from 'react';
import {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import {Box, Fab, Typography} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Divider from '@mui/material/Divider';
import PercentRoundedIcon from '@mui/icons-material/PercentRounded';
import SavingsProgress from './LinearProgress';
import AllocationDialog from "./AllocationDialog.jsx";
import {getApi} from "../utils/api.utils.js";

export default function Savings() {
    const [objectivesList, setObjectivesList] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        // retrieve all the objectives
        getApi('objective/').then((data) => {
            if (!data.message) {
                setObjectivesList(data);
            }
        });
    }, []);

    const handleOpenDialog = () => setOpen(true);

    return (
        <Box className='window'>
            <AllocationDialog isOpen={open} setOpen={setOpen} objectivesList={objectivesList}
                              setObjectivesList={setObjectivesList}/>
            <Sidebar/>
            <Box className='main-content' sx={{
                display: 'flex', flexDirection: 'row',
                width: '100%'
            }}>
                <Box sx={{width: '50%', height: '100%', m: 3}}>
                    <p>box 1</p>
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{width: '50%', height: '100%', m: 3, overflowY: 'auto'}}>
                    <Typography variant='h4' sx={{mb: 3}}>I tuoi obiettivi</Typography>
                    { /* TODO qui generare la lista a partire dall'array dei savings */}
                    <Typography variant='h6'>Vacanze</Typography>
                    <SavingsProgress value={50}/>
                    <Typography variant='body1'>currentValue / totalValue</Typography>
                    { /* TODO aggiustare l'hover dei FAB */}
                    <Fab onClick={handleOpenDialog} color='savings' sx={{
                        position: 'absolute',
                        top: '77vh',
                    }}>
                        <PercentRoundedIcon/>
                    </Fab>
                    <Fab color='savings' sx={{
                        position: 'absolute',
                        top: '87vh'
                    }}>
                        <AddRoundedIcon/>
                    </Fab>
                </Box>
            </Box>
        </Box>
    );
}