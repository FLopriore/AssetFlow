import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {putApi} from "../utils/api.utils.js";
import { Button } from '@mui/material';
import { useContext } from 'react';
import { ExpenseListContext, IncomeListContext } from './ListContext';

//confronto tra due array che elimina gli elemanti del primo se matchano gli id del secondo
function filterById (array, idsToRemove) {
    return array.filter(item => !idsToRemove.includes(item.dbId));
  };


export default function DeleteDialog({isOpen, setOpen, isPositive, selected}) {
    const { incomeList, setIncomeList } = useContext(IncomeListContext)
    const { expenseList, setExpenseList } = useContext(ExpenseListContext)
    
    console.log(incomeList)
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = JSON.stringify(selected);
        if(isPositive) {
            putApi('income/delete', body).then(() => {
                setIncomeList(filterById(incomeList, selected));
                handleClose();
            }).catch((e) => {
                console.log(e);
                handleClose();
            })
        } else {
            putApi('expense/delete', body).then(() => {
                setExpenseList(filterById(expenseList, selected));
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
            <Button onClick={handleClose}>Anulla</Button>
            <Button type='submit' autoFocus>
                Elimina
            </Button>
            </DialogActions>
      </Dialog>
    );
}