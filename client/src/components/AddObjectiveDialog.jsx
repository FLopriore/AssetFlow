import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {postApi} from "../utils/api.utils.js";
import FormControl from '@mui/material/FormControl';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function AddObjectiveDialog({isOpen, setOpen, objectivesList, setObjectivesList}) {
    const [errorAmount, setErrorAmount] = useState(false);
    const [isSavedLessThanObjective, setSavedLessThanObjective] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const objectiveMoney = Number(data.get('objectiveMoney'));
        const savedMoney = Number(data.get('savedMoney'));
        setSavedLessThanObjective(savedMoney <= objectiveMoney);
        if (savedMoney <= objectiveMoney) {
            const body = {
                name: data.get('name'),
                percentage: 0,
                objectiveMoney: objectiveMoney,
                savedMoney: savedMoney
            };
            postApi('objective/', body)
                .then((data) => {
                    objectivesList.push(data);
                    setObjectivesList(objectivesList);
                    handleClose();
                })
                .catch((e) => {
                    console.log(e);
                    handleClose();
                    // TODO: show error message
                })
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeAmount = (event) => {
        const amount = event.target.value;
        if (amount < 0) {
            if (!errorAmount) setErrorAmount(true);
        } else if (errorAmount) {
            setErrorAmount(false);  // nascondi il messaggio di errore
        }
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
            <DialogTitle>Aggiungi obiettivo di risparmio</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="Nome"
                        color='secondary'
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="objectiveMoney"
                        name="objectiveMoney"
                        label="Importo"
                        type="number"
                        inputProps={{min: 0}}
                        fullWidth
                        variant="outlined"
                        color='secondary'
                        error={errorAmount}
                        onChange={handleChangeAmount}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="savedMoney"
                        name="savedMoney"
                        label="Soldi messi da parte"
                        type="number"
                        inputProps={{min: 0}}
                        fullWidth
                        variant="outlined"
                        color='secondary'
                        error={errorAmount}
                        helperText={(errorAmount) ? "Gli importi devono essere positivi o nulli." : ""}
                        onChange={handleChangeAmount}
                    />
                </FormControl>
            </DialogContent>
            <Collapse in={!isSavedLessThanObjective}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setSavedLessThanObjective(true);
                            }}
                        >
                            <CloseIcon fontSize="inherit"/>
                        </IconButton>
                    }
                    sx={{mb: 2}}
                >
                    L'importo risparmiato deve essere inferiore dell'obiettivo.
                </Alert>
            </Collapse>
            <DialogActions>
                <Button color='secondary' onClick={handleClose}>Annulla</Button>
                <Button color='secondary' type="submit" disabled={errorAmount}>Aggiungi</Button>
            </DialogActions>
        </Dialog>
    );
}