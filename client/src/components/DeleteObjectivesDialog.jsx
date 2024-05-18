import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {deleteApi} from "../utils/api.utils.js";
import {Button} from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';

export default function DeleteObjectivesDialog({isOpen, setOpen, delObjective, setDeleteObjective, objectivesList, setObjectivesList}) {

    const handleSubmit = (event) => {
        event.preventDefault();
        deleteApi('objective', delObjective._id)
            .then(() => {
                const newObjectivesList = objectivesList.filter((el) => el._id !== delObjective._id);
                setObjectivesList(newObjectivesList);
                setDeleteObjective({});
            })
            .catch((e) => {
                console.log(e)
            })
        handleClose()
    }

    const handleClose = () => setOpen(false);

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Elimina obiettivo</DialogTitle>
            <DialogContent sx={{textAlign: 'center'}}>
                Sei sicuro di voler eliminare l'obiettivo?
            </DialogContent>
            <DialogContentText sx={{mr: 4, ml: 4}}>
                Dovrai riallocare le percentuali degli obiettivi rimanenti.
            </DialogContentText>
            <DialogActions sx={{mt: 2}}>
                <Button onClick={handleClose} sx={{color: '#ff9100'}}>Annulla</Button>
                <Button type="submit" sx={{color: '#ff9100'}}>Elimina</Button>
            </DialogActions>
        </Dialog>
    );
}