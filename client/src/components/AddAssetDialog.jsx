import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {postApi} from "../utils/api.utils.js";
import { useState } from 'react';
import Button from '@mui/material/Button';

export default function AddAssetDialog() {
    const [open, setOpen] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = JSON.stringify({
            tracker: data.get('asset'),
            investedCapital: data.get('investedCapital')
        });
        postApi('asset/', body)
            .then((data) => {
                // TODO: add element to list
                handleClose();
            })
            .catch((e) => {
                handleClose();
                // TODO: show error message
            })
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Aggiungi asset</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="asset"
                    name="asset"
                    label="Ticker del titolo"
                    fullWidth
                    variant="outlined"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="investedCapital"
                    name="investedCapital"
                    type="number"
                    label="Capitale investito"
                    fullWidth
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button type="submit">Aggiungi</Button>
            </DialogActions>
        </Dialog>
    );
}