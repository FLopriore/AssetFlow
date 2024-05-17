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
        deleteApi('asset', assetId[0])
            .then(() => {
                const newAssetList = assetList.filter((el) => el.id !== assetId[0]);
                setAssetList(newAssetList);
                setAssetId(null);
                localStorage.removeItem(assetId[1])
                localStorage.removeItem(assetId[1]+"_price")
                localStorage.removeItem(assetId[1]+"_dir")
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
            <DialogTitle>Aggiungi asset</DialogTitle>
            <DialogContent>
                Sei Sicuro di voler eliminare l'Asset?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button type="submit">Si</Button>
            </DialogActions>
        </Dialog>
    );
}