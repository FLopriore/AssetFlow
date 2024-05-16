import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {postApi} from "../utils/api.utils.js";
import Button from '@mui/material/Button';

export default function AddAssetDialog({isOpen, setOpen, assetList, setAssetList, ws}) {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            'tracker': data.get('asset'),
            'investedCapital': '0', //Perchè non usiamo il capitale investito
        };
        postApi('asset/', body)
            .then((data) => {
                const assetElement = {
                    idx: assetList,
                    label: (data.tracker).toUpperCase(),
                    id: data._id
                };
                const updatedList = [...assetList, assetElement];
                setAssetList(updatedList);
                handleClose();
            })
            .catch((e) => {
                console.log(e)
                handleClose();
                // TODO: show error message
            })
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
                    helperText={"Ricorda di inserire un ticker valido"}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button type="submit">Aggiungi</Button>
            </DialogActions>
        </Dialog>
    );
}