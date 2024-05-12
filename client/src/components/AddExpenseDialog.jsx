import * as React from 'react';
import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {postApi} from "../utils/api.utils.js";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AddExpenseDialog({isOpen, setOpen, expenseList, setExpenseList}) {
    const [error, setError] = useState(false);
    const [category, setCategory] = useState('others');

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = JSON.stringify({
            negativeAmount: data.get('negativeAmount'),
            category: data.get('category'),
            description: data.get('description')
        });
        postApi('expense/', body)
            .then((data) => {
                expenseList.push(data);
                setExpenseList(expenseList);
                handleClose();
            })
            .catch((e) => {
                console.log(e);
                handleClose();
                // TODO: show error message
            })
    };

    const handleChangeAmount = (event) => {
        const amount = event.target.value;
        if (amount > 0) {
            if (!error) setError(true);
        } else if (error) {
            setError(false);  // nascondi il messaggio di errore
        }
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
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
            <DialogTitle>Aggiungi entrata</DialogTitle>
            <DialogContent>
                <FormControl fullWidth>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="negativeAmount"
                        name="negativeAmount"
                        label="Importo"
                        type="number"
                        fullWidth
                        variant="outlined"
                        error={error}
                        helperText={(error)? "L'importo deve essere negativo." : ""}
                        onChange={handleChangeAmount}
                    />
                    <Select
                        name="category"
                        id="category"
                        value={category}
                        onChange={handleChangeCategory}
                    >
                        <MenuItem value='shopping'>Shopping</MenuItem>
                        <MenuItem value='bollette'>Bollette</MenuItem>
                        <MenuItem value='affitto'>Affitto</MenuItem>
                        <MenuItem value='buy_asset'>Acquisto asset</MenuItem>
                        <MenuItem value='others'>Altro</MenuItem>
                    </Select>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
                        name="description"
                        label="Descrizione"
                        fullWidth
                        variant="outlined"
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button type="submit" disabled={error}>Aggiungi</Button>
            </DialogActions>
        </Dialog>
    );
}