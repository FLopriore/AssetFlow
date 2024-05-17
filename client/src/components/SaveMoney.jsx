import * as React from 'react';
import {useState} from 'react';
import TextField from '@mui/material/TextField';
import {postApi, putApi} from "../utils/api.utils.js";
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

export default function SaveMoney({enable, setEnable, objectivesList, setObjectivesList, total, setTotal}) {

    const [error, setError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const savedTotalAmount = data.get('save-money-input');
        let remaining = 0;

        objectivesList.forEach((el) => {
            const percentSaved = el.percentage * savedTotalAmount / 100;  // denaro da allocare per questo obiettivo
            const moneyToSave = el.objectiveMoney - el.savedMoney;  // denaro che resta per raggiungere l'obiettivo
            if (moneyToSave > 0) {
                // Se la percentuale sul totale (percentSaved) è al più pari al denaro rimanente, incrementa el.savedMoney.
                if (percentSaved <= moneyToSave) {
                    el.savedMoney += percentSaved;
                } else {
                    // Se percentSaved è maggiore del denaro rimanente, completa l'obiettivo.
                    // Il denaro rimanente viene inserito nel contatore "remaining", che alla fine dovrà essere
                    // sottratto a savedTotalAmount per decrementare il valore di total.
                    remaining += percentSaved - moneyToSave;
                    el.savedMoney = moneyToSave;
                }
            } else {
                // Se l'obiettivo è già stato raggiunto, non si allocano questi soldi.
                remaining += percentSaved;
            }
        });

        putApi('objective/save', objectivesList)
            .then(() => {
                const newTotal = total - remaining;
                setObjectivesList(objectivesList);
                setTotal(remaining);
                if (newTotal === 0) {
                    setEnable(false);
                }

                const today = new Date();
                const saveExpense = {
                    category: "others",
                    negativeAmount: (-1) * newTotal,
                    description: `Risparmi ${today.getDate()}/${today.getMonth()}/${today.getFullYear()}`
                }
                return postApi('expense', saveExpense);
            })
            .catch((e) => {
                console.log(e)
                // TODO: show error message
            })
    };

    const handleChangeAmount = (event) => {
        const amount = event.target.value;
        if (amount < 0) {
            setError(true);
        } else if (amount > total) {
            setError(true);
        } else if (error) {
            setError(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth sx={{mt: '20%'}}>
                <TextField
                    margin="dense"
                    id="save-money-input"
                    name="save-money-input"
                    label="Importo da risparmiare"
                    type="number"
                    inputProps={{min: 0, max: total}}
                    variant="outlined"
                    color='savings'
                    error={error}
                    helperText={(error) ? "L'importo deve essere positivo e superiore al totale." : ""}
                    onChange={handleChangeAmount}
                />
                <Button
                    disabled={!enable}
                    type="submit"
                    sx={{
                        color: '#ff9100',
                        '&:hover': {
                            backgroundColor: '#fff8e1',
                        }
                    }}>Salva</Button>
            </FormControl>
        </form>
    );
}