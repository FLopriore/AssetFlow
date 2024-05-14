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
import AddObjectiveDialog from "./AddObjectiveDialog.jsx";

export default function Savings() {
    const [objectivesList, setObjectivesList] = useState([]);
    const [openAlloc, setOpenAlloc] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);

    useEffect(() => {
        // retrieve all the objectives
        getApi('objective/').then((data) => {
            if (!data.message) {
                setObjectivesList(data);
            }
        });
    }, []);

    const handleOpenAllocDialog = () => setOpenAlloc(true);
    const handleOpenAddDialog = () => setOpenAdd(true);

    const calculatePercentage = (a, b) => Math.round(a / b * 100);

    return (
        <Box className='window'>
            <AllocationDialog isOpen={openAlloc} setOpen={setOpenAlloc} objectivesList={objectivesList}
                              setObjectivesList={setObjectivesList}/>
            <AddObjectiveDialog isOpen={openAdd} setOpen={setOpenAdd} objectivesList={objectivesList}
                                setObjectivesList={setObjectivesList}/>
            <Sidebar/>
            <Box className='main-content' sx={{
                display: 'flex',
                flexDirection: 'row',
                border: '3px solid',
                borderColor: '#FFA200',
                margin: '1rem',
                borderRadius: '20px',
                padding: '1rem',
                overflowY: 'auto',
            }}>
                <Box sx={{width: '50%', height: '100%', m: 3}}>
                    <p>box 1</p>
                </Box>
                <Divider orientation="vertical" flexItem/>
                <Box sx={{width: '50%', height: '100%', m: 3, overflowY: 'auto'}}>
                    <Typography variant='h4' sx={{mb: 3}}>I tuoi obiettivi</Typography>
                    {objectivesList && objectivesList.map((objective) => (
                        <>
                            <Typography variant='h6'>{objective.name}</Typography>
                            <SavingsProgress
                                value={calculatePercentage(objective.savedMoney, objective.objectiveMoney)}/>
                            <Typography
                                variant='body1'>€{objective.savedMoney} / {objective.objectiveMoney}</Typography>
                        </>
                    ))}
                    { /* TODO aggiustare l'hover dei FAB */}
                    <Fab onClick={handleOpenAllocDialog} color='savings' sx={{
                        position: 'absolute',
                        top: '77vh',
                    }}>
                        <PercentRoundedIcon/>
                    </Fab>
                    <Fab onClick={handleOpenAddDialog} color='savings' sx={{
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