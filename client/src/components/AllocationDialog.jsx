import * as React from 'react';
import {useState} from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import {putApi} from "../utils/api.utils.js";

export default function AllocationDialog({isOpen, setOpen, objectivesList, setObjectivesList}) {
    const [errorPercentage, setErrorPercentage] = useState(false);
    const [errorAllocate, setErrorAllocate] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        putApi('objective/percent/', objectivesList)
            .then((data) => {
                if (data.success) {
                    setErrorAllocate(false);
                }
                handleClose();
            })
            .catch((e) => {
                setErrorAllocate(true);  // mostra messaggio di errore dell'allocazione
            })
    };

    const handleChangeAmount = (event) => {
        const changedList = [...objectivesList]; 
        const amount = event.target.value;
        const changedIndex = changedList.findIndex((el) => el._id === event.target.id);
        if (changedIndex !== -1) {
            changedList[changedIndex].percentage = amount;  // update della specifica percentuale
        }
    
        setObjectivesList(changedList); // aggiorno lo stato della lista in modo da effettuare il controllo sulla lista aggiornata
    
        // Check somma percentuali = 100
        const totalPercentages = changedList.reduce((accum, current) => accum + Number(current.percentage), 0);
        if (totalPercentages !== 100) {
            if (!errorPercentage) setErrorPercentage(true); 
        } else {
            setErrorPercentage(false); 
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Alloca una percentuale ad ogni obiettivo</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <List>
                        {
                            objectivesList && objectivesList.map((el) => (
                                <ListItem key={el._id}>
                                    <ListItemText primary={el.name}/>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id={el._id}
                                        name={el._id}
                                        label="Percentuale"
                                        type="number"
                                        inputProps={{min: 0, max: 100}}
                                        variant="outlined"
                                        color='secondary'
                                        error={errorPercentage}
                                        sx={{width: "40%"}}
                                        defaultValue={el.percentage}
                                        onChange={handleChangeAmount}
                                    />
                                </ListItem>

                            ))
                        }
                    </List>
                </FormControl>
                <Collapse in={errorPercentage}>
                  <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setErrorPercentage(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                        sx={{mb: 2}}
                    >
                        La somma delle percentuali deve essere 100%
                    </Alert>      
                </Collapse>
                <Collapse in={errorAllocate}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setErrorAllocate(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit"/>
                            </IconButton>
                        }
                        sx={{mb: 2}}
                    >
                        Errore nel salvataggio delle percentuali!
                    </Alert>
                </Collapse>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={handleClose} sx={{color: '#ff9100'}}>Annulla</Button>
                <Button color='secondary' type="submit" disabled={errorPercentage} sx={{color: '#ff9100'}}>Salva</Button>
            </DialogActions>
        </Dialog>
    );
}