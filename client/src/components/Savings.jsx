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
import Loading from "./Loading.jsx";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import SaveMoney from "./SaveMoney.jsx";

export default function Savings() {
    const [objectivesList, setObjectivesList] = useState([]);
    const [openAlloc, setOpenAlloc] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [savings, setSavings] = useState(0)
    const [isPositive, setIsPositive] = useState(true)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // retrieve all the objectives
        getApi('objective/')
            .then((data) => {
                setObjectivesList(data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });

        //retrieve savings
        getApi('budget/total').then((data) => {
            setSavings(data.total);
            if (data.total > 0) {
                setIsPositive(true)
            } else (setIsPositive(false));
            setLoading(false);
        }).catch((e) => {
            console.log(e);
            setLoading(false);
        })
    }, []);


    if (loading) {
        return <Loading color='#FFA200'/>
    }

    const handleOpenAllocDialog = () => setOpenAlloc(true);
    const handleOpenAddDialog = () => setOpenAdd(true);

    const calculatePercentage = (a, b) => Math.round(a / b * 100);

    const hoverFab = {backgroundColor: "#ffe182"};

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
                <Box sx={{width: '50%', height: '100%', m: 3, display: 'flex', flexDirection: 'column'}}>
                    <Typography variant='h4' sx={{mb: 3, width: '100%'}}>I tuoi risparmi</Typography>
                    <Typography sx={{textAlign: 'center'}} variant='h5'>Nell'ultimo mese hai risparmiato</Typography>
                    <Box sx={{
                        display: 'flex',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '3vw',
                        mt: 3
                    }}>
                        {isPositive ? <TrendingUpRoundedIcon fontSize='large' color='primary'/>
                            : <TrendingDownRoundedIcon fontSize='large' color='secondary'/>}
                        <Box sx={{
                            maxWidth: '50%',
                            minWidth: '15vw',
                            height: '10vh',
                            borderRadius: '10px',
                            bgcolor: '#fff0bd',
                            alignSelf: 'center',
                            textAlign: 'center',
                            p: 2


                        }}>
                            <h2>{savings} €</h2>
                        </Box>
                    </Box>
                    {
                        <Box sx={{
                            textAlign: 'center',
                            bgcolor: (isPositive) ? '#ddffd0' : '#ffedf0',
                            mt: 4,
                            borderRadius: '10px',
                            p: 3
                        }}>
                            <Typography variant='body1'>
                                {(isPositive) ? "Continua così!\nPuoi assegnare i risparmi ai tuoi obiettivi secondo le tue preferenze." : "Sei in rosso!\nNon puoi risparmiare nulla."}
                            </Typography>
                        </Box>
                    }
                    <SaveMoney objectivesList={objectivesList} setObjectivesList={setObjectivesList} enable={isPositive}
                               setEnable={setIsPositive} total={savings} setTotal={setSavings}/>
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
                    <Fab onClick={handleOpenAllocDialog} color='savings' sx={{
                        position: 'absolute',
                        top: '77vh',
                        "&:hover": hoverFab
                    }}>
                        < PercentRoundedIcon/>
                    </Fab>
                    <Fab onClick={handleOpenAddDialog} color='savings' sx={{
                        position: 'absolute',
                        top: '87vh',
                        "&:hover": hoverFab
                    }}>
                        <AddRoundedIcon/>
                    </Fab>
                </Box>
            </Box>
        </Box>
    );
}