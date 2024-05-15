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
import { useContext } from 'react';
import { IncomeListContext } from './ListContext.jsx';

export default function AddIncomeDialog({isOpen, setOpen}) {
    const [error, setError] = useState(false);
    const [category, setCategory] = useState('others');
    const {incomeList, setIncomeList, incomeYearList, setIncomeYearList} = useContext(IncomeListContext)

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const body = {
            positiveAmount: data.get('positiveAmount'),
            category: data.get('category'),
            description: data.get('description')
        };
        console.log(body)
        postApi('income/', body)
            .then((data) => {
                incomeList.push(data);
                setIncomeList(incomeList);
                setIncomeYearList(incomeYearList);
                handleClose();
            })
            .catch((e) => {
                handleClose();
                // TODO: show error message
            })
    };

    const handleChangeAmount = (event) => {
        const amount = event.target.value;
        if (amount < 0) {
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
                        id="positiveAmount"
                        name="positiveAmount"
                        label="Importo"
                        type="number"
                        fullWidth
                        variant="outlined"
                        error={error}
                        helperText={(error)? "L'importo deve essere positivo." : ""}
                        onChange={handleChangeAmount}
                    />
                    <Select
                        name="category"
                        id="category"
                        value={category}
                        onChange={handleChangeCategory}
                    >
                        <MenuItem value='stipendio'>Stipendio</MenuItem>
                        <MenuItem value='sell_asset'>Vendita asset</MenuItem>
                        <MenuItem value='regali'>Regali</MenuItem>
                        <MenuItem value='dividendi'>Dividendi</MenuItem>
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