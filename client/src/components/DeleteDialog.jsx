import * as React from 'react';
import {useContext} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {putApi} from "../utils/api.utils.js";
import {Button} from '@mui/material';
import {ExpenseListContext, IncomeListContext} from '../contexts/ListContext.jsx';

//confronto tra due array che elimina gli elemanti del primo se matchano gli id del secondo
function deleteById(array, idsToRemove) {
    return array.filter(item => !idsToRemove.includes(item._id));
}

export default function DeleteDialog({isOpen, setOpen, isPositive, selected}) {
    const {
        incomeList,
        setIncomeList,
        incomeMonthlyList,
        setIncomeMonthlyList,
        incomeYearList,
        setIncomeYearList,
    } = useContext(IncomeListContext);
    const {
        expenseList,
        setExpenseList,
        expenseMonthlyList,
        setExpenseMonthlyList,
        expenseYearList,
        setExpenseYearList,
    } = useContext(ExpenseListContext);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = selected.map((id) => {
            return {_id: id};
        });
        if (isPositive) {
            putApi('income/delete', body).then(() => {
                setIncomeList(deleteById(incomeList, selected));
                setIncomeMonthlyList(deleteById(incomeMonthlyList, selected));
                setIncomeYearList(deleteById(incomeYearList, selected));
                handleClose();
            }).catch((e) => {
                console.log(e);
                handleClose();
            })
        } else {
            putApi('expense/delete', body).then(() => {
                setExpenseList(deleteById(expenseList, selected));
                setExpenseMonthlyList(deleteById(expenseMonthlyList, selected));
                setExpenseYearList(deleteById(expenseYearList, selected));
                handleClose();
            }).catch((e) => {
                console.log(e);
                handleClose();
            })
        }

    }

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle id="delete-dialog-title">
                {"Elimina selezionati"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-dialog-description">
                    Vuoi eliminare gli elementi selezionati?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annulla</Button>
                <Button type='submit' autoFocus>
                    Elimina
                </Button>
            </DialogActions>
        </Dialog>
    );
}