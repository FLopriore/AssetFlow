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
        const savedTotalAmount = Number(data.get('save-money-input'));  //denaro che si vuole risparmiare in totale

        // Contatore del denaro effettivamente risparmiato.
        // Potrebbe accadere, infatti, che un obiettivo è stato già raggiunto oppure la percentuale di savedTotalAmount
        // allocabile in teoria ad un obiettivo è superiore al denaro necessario per raggiungere l'obiettivo.
        //
        // Esempio:
        // Obiettivo ABC: objectiveMoney = 2000, savedMoney = 1800, percentage = 25%
        // savedTotalAmount = 1000
        // Per l'obiettivo ABC, la percentuale che dovremmo allocare sarebbe 0.25*1000 = €250, ma per raggiungere
        // l'obiettivo bastano €200. Pertanto, il valore effettivamente risparmiato per questo obiettivo è proprio €200
        // e savedCount viene incrementato solo di €200.
        let savedCount = 0;

        objectivesList.forEach((el) => {
            const percentSaved = el.percentage * savedTotalAmount / 100;  // denaro da allocare per questo obiettivo
            const moneyToSave = el.objectiveMoney - el.savedMoney;  // denaro che resta per raggiungere l'obiettivo
            if (moneyToSave > 0) {
                // Se la percentuale sul totale (percentSaved) è al più pari al denaro rimanente, incrementa el.savedMoney.
                if (percentSaved <= moneyToSave) {
                    el.savedMoney += percentSaved;
                    savedCount += percentSaved;
                } else {
                    // Se percentSaved è maggiore del denaro rimanente, completa l'obiettivo e incrementa savedCount
                    // del denaro effettivamente risparmiato.
                    el.savedMoney = moneyToSave;
                    savedCount += moneyToSave;
                }
            }
        });

        putApi('objective/save', objectivesList)
            .then(() => {
                const newTotal = total - savedCount;
                setObjectivesList(objectivesList);
                setTotal(newTotal);
                if (newTotal === 0) {
                    setEnable(false);
                }

                const today = new Date();
                const saveExpense = {
                    category: "others",
                    negativeAmount: (-1) * savedCount,
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
                    label="Importo da assegnare"
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