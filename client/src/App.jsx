import MenuAppBar from './components/AppBar'
import './App.css'
import Sidebar from './components/Sidebar'
import {Box, Grid, Typography} from '@mui/material'
import {HomeGreenPie, HomeRedPie} from './components/PieChart'
import {getApi} from "./utils/api.utils.js";
import * as React from "react";
import {useEffect, useState} from "react";
import {HomeTable} from './components/Table.jsx'
import {getLatestEntriesData} from './utils/budgetEntries.utils.js'
import Loading from "./components/Loading.jsx";
import { IncomeListContext, ExpenseListContext } from './contexts/ListContext.jsx'


function App() {

    const [incomeTotal, setIncome] = useState(0);
    const [expenseTotal, setExpenses] = useState(0);
    const [expenseList, setExpenseList] = useState([]);
    const [incomeList, setIncomeList] = useState([]);

    const [loading, setLoading] = useState(true);

    const incomeValue = { incomeList, setIncomeList }
    const expenseValue = { expenseList, setExpenseList }

    useEffect(() => {
        // retrieve total income
        const budgetIncomePromise = getApi('budget/income/');
        // retrieve total expenses
        const budgetExpensesPromise = getApi('budget/expense/');
        // retrieve list of expenses
        const expensePromise = getApi('expense/');
        // retrieve list of income sources
        const incomePromise = getApi('income/');

        //Riunisce sotto una sola promise
        Promise.all([budgetIncomePromise, budgetExpensesPromise, expensePromise, incomePromise])
            .then((responses) => {
                setIncome(responses[0].totalIncome);
                setExpenses(responses[1].totalExpenses);

                const expenseTableList = getLatestEntriesData(responses[2], false);
                const incomeTableList = getLatestEntriesData(responses[3], true);

                setExpenseList(expenseTableList);
                setIncomeList(incomeTableList);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            })
    }, []);

    if (loading) {
        return <Loading color='#61c86a'/>
    }

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
                            overflowY: 'auto'
                        }}>
                            <IncomeListContext.Provider value={incomeValue}>
                                <Grid container direction='column' alignItems='center'>
                                    <Grid item>
                                        <Typography variant='h4' sx={{mt: 4, mb: 3}}>Entrate</Typography>
                                    </Grid>
                                    <Grid item>
                                        <h2>+{incomeTotal} €</h2>
                                    </Grid>
                                    <Grid item>
                                        <HomeGreenPie data={incomeList}/>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            padding: '1rem',
                                            textAlign: 'center',
                                            minWidth: '400px'
                                        }}>
                                            <h3>Ultime entrate</h3>
                                            <HomeTable isPositive={true}/>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </IncomeListContext.Provider>
                        </Box>
                        <Box sx={{
                            flexGrow: 1,
                            border: '3px solid',
                            borderColor: '#CE310E',
                            margin: '1rem',
                            borderRadius: '20px',
                            overflowY: 'auto'
                        }}>
                            <ExpenseListContext.Provider value={expenseValue}>
                                <Grid container direction='column' alignItems='center'>
                                    <Grid item>
                                        <Typography variant='h4' sx={{mt: 4, mb: 3}}>Uscite</Typography>
                                    </Grid>
                                    <Grid item>
                                        <h2>{expenseTotal} €</h2>
                                    </Grid>
                                    <Grid item>
                                        <HomeRedPie data={expenseList}/>
                                    </Grid>
                                    <Grid item>
                                        <Box sx={{
                                            padding: '1rem',
                                            textAlign: 'center',
                                            minWidth: '400px'
                                        }}>
                                            <h3>Ultime spese</h3>
                                            <HomeTable isPositive={false}/>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </ExpenseListContext.Provider>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default App
