import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import {deleteApi} from "../utils/api.utils.js";

export default function DeleteAssetDialog({isOpen, setOpen, assetId, setAssetId, assetList, setAssetList}) {

    const handleSubmit = (event) => {
        event.preventDefault();
        deleteApi('asset', assetId.id)
            .then(() => {
                const newAssetList = assetList.filter((el) => el.id !== assetId.id);
                setAssetList(newAssetList);
                setAssetId({});
                localStorage.removeItem(assetId.label)
                localStorage.removeItem(assetId.label+"_price")
                localStorage.removeItem(assetId.label+"_dir")
            })
            .catch((e) => {
                console.log(e)
            })
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
            <DialogTitle>Elimina asset</DialogTitle>
            <DialogContent>
                Sei sicuro di voler eliminare l'Asset?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button type="submit">Elimina</Button>
            </DialogActions>
        </Dialog>
    );
}