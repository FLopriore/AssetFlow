import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import Button from '@mui/material/Button';

const BASE_URL = 'http://localhost:3000/';

export default function DeleteAssetDialog({isOpen,setOpen,assetId,setAssetId,setUpdate}) {

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${BASE_URL}api/asset/${assetId}?id`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
        }).then(res => {
            if(res.status == 200) {setAssetId("")}
        }).catch((e) =>{console.log(e)})
        handleClose()
}

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
            <DialogTitle>Aggiungi asset</DialogTitle>
            <DialogContent>
                Sei sicuro di voler eliminare l'Asset?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button type="submit">Si</Button>
            </DialogActions>
        </Dialog>
    );
}