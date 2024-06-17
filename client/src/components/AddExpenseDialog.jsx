import * as React from 'react';
import {useContext, useState} from 'react';
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
import {ExpenseListContext} from '../contexts/ListContext.jsx';

export default function AddExpenseDialog({isOpen, setOpen}) {
    const [error, setError] = useState(false);
    const [category, setCategory] = useState('others');
    const {
        expenseList,
        setExpenseList,
        expenseMonthlyList,
        setExpenseMonthlyList,
        expenseYearList,
        setExpenseYearList,
    } = useContext(ExpenseListContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            negativeAmount: data.get('negativeAmount'),
            category: data.get('category'),
            description: data.get('description')
        };
        postApi('expense/', body)
            .then((data) => {
                const newExpenseList = [...expenseList, data];
                expenseMonthlyList.push(data);
                expenseYearList.push(data);
                setExpenseList(newExpenseList);
                setExpenseMonthlyList(expenseMonthlyList);
                setExpenseYearList(expenseYearList);
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
            <DialogTitle>Aggiungi spesa</DialogTitle>
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
                        required
                        variant="outlined"
                        color='secondary'
                        error={error}
                        helperText={(error) ? "L'importo deve essere negativo." : ""}
                        onChange={handleChangeAmount}
                    />
                    <Select
                        name="category"
                        id="category"
                        value={category}
                        color='secondary'
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
                        color='secondary'
                        fullWidth
                        required
                        variant="outlined"
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button color='secondary' onClick={handleClose}>Annulla</Button>
                <Button color='secondary' type="submit" disabled={error}>Aggiungi</Button>
            </DialogActions>
        </Dialog>
    );
}