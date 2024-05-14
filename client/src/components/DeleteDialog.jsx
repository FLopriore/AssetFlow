import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {putApi} from "../utils/api.utils.js";
import { Button } from '@mui/material';
import { ListContext } from './ListContext.jsx';
import { useContext } from 'react';

export default function DeleteDialog({isOpen, setOpen, isPositive, selected}) {
    const { incomeList, setIncomeList, expenseList, setExpenseList } = useContext(ListContext)
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const body = JSON.stringify(selected);
        if(isPositive) {
            putApi('income/delete', body).then((data) => {
                setIncomeList(incomeList.filter((entry) => !selected.includes(entry.id)));
                handleClose();
                console.log(incomeList)
            }).catch((e) => {
                console.log(e);
                handleClose();
            })
        } else {
            putApi('expense/delete', body).then((data) => {
                setExpenseList(expenseList.filter((entry) => !selected.includes(entry.id)));
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