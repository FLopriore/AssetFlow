import MenuAppBar from './components/AppBar'
import './App.css'
import Sidebar from './components/Sidebar'
import {Box, Grid, List, ListItem, ListItemText, Typography} from '@mui/material'
import {HomeGreenPie, HomeRedPie} from './components/PieChart'
import getApi from "./utils/api.utils.js";
import {useEffect, useState} from "react";

function getHomeData(budgetEntriesList, isPositive) {
    const data = [];
    if (budgetEntriesList.length) {
        budgetEntriesList.forEach((el, index) => {
            if (index <= 5) {
                const dataElement = {id: index, label: el.description};
                dataElement.value = (isPositive) ? el.positiveAmount : el.negativeAmount*(-1);
                data.push(dataElement);
            }
        })
    }
    return data;
}

function App() {
    const [incomeTotal, setIncome] = useState(0);
    const [expenseTotal, setExpenses] = useState(0);
    const [expenseList, setExpenseList] = useState([]);
    const [incomeList, setIncomeList] = useState([]);

    useEffect(() => {
        // retrieve total income
        getApi('budget/income/').then((data) => {
            setIncome(data.totalIncome);
        });

        // retrieve total expenses
        getApi('budget/expense/').then((data) => {
            setExpenses(data.totalExpenses);
        });

        // retrieve list of expenses
        getApi('expense/').then((data) => {
            setExpenseList(data);
        });

        // retrieve list of income sources
        getApi('income/').then((data) => {
            setIncomeList(data);
        });
    }, []);

    const incomeData = getHomeData(incomeList, true);
    const expenseData = getHomeData(expenseList, false);

    return (
        <>
            <Box className='window'>
                <Sidebar className='sidebar'/>
                <Box className='main-content' id='homebox'>
                    <MenuAppBar id='appbar-h'/>
                    <Box sx={{display: 'flex', flexDirection: 'row', flexGrow: 1, height: '90%'}}>
                        <Box sx={{
                            flexGrow: 1, border: '3px solid',
                            borderColor: '#61c86a', margin: '1rem',
                            borderRadius: '20px',
                        }}>
                            <Grid container direction='column' alignItems='center'>
                                <Grid item>
                                    <h1>Entrate</h1>
                                </Grid>
                                <Grid item>
                                    <h2>+{incomeTotal}</h2>
                                </Grid>
                                <Grid item>
                                    <HomeGreenPie incomesList={incomeList}/>
                                </Grid>
                                <Grid item display='flex' alignItems='stretch'>
                                    <Box sx={{
                                        borderRadius: '20px',
                                        bgcolor: '#dbdbdb',
                                        padding: '1rem',
                                        textAlign: 'center',
                                        maxHeight: '11rem',
                                        overflow: 'auto'
                                    }}>
                                        <h3>Ultime entrate:</h3>
                                        {incomeData.map((income) => (
                                            <div key={income.id}>
                                                <p>+{income.value}: {income.label}</p>
                                            </div>
                                      ))}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box sx={{
                            flexGrow: 1,
                            border: '3px solid',
                            borderColor: '#CE310E',
                            margin: '1rem',
                            borderRadius: '20px'
                        }}>
                            <Grid container direction='column' alignItems='center'>
                                <Grid item>
                                    <h1>Spese</h1>
                                </Grid>
                                <Grid item>
                                    <h2>{expenseTotal}</h2>
                                </Grid>
                                <Grid item>
                                    <HomeRedPie expensesList={expenseList}/>
                                </Grid>
                                <Grid item display='flex' alignItems='stretch'>
                                    <Box sx={{
                                        borderRadius: '20px',
                                        bgcolor: '#dbdbdb',
                                        padding: '1rem',
                                        textAlign: 'center',
                                        maxHeight: '11rem',
                                        overflow: 'auto'
                                    }}>
                                        <h3>Ultime spese:</h3>
                                        {expenseData.map((income) => (
                                            <div key={income.id}>
                                                <p>-{income.value}: {income.label}</p>
                                            </div>
                                      ))}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default App
