import * as React from 'react';
import {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import {Box, Fab, Tab, Typography} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {ExpensePie} from './PieChart';
import {getApi} from '../utils/api.utils';
import {ExpenseAccordion} from './Accordion';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddExpenseDialog from "./AddExpenseDialog.jsx";
import {ExpenseListContext} from '../contexts/ListContext.jsx';
import Loading from "./Loading.jsx";

export default function Expense() {
    const [value, setValue] = useState('0');
    const [expenseYearList, setExpenseYearList] = useState([]);
    const [expenseTotal, setExpense] = useState(0);
    const [expenseMonthlyList, setExpenseMonthlyList] = useState([]);
    const [expenseList, setExpenseList] = useState([]);

    const expenseValue = {
        expenseList,
        setExpenseList,
        expenseYearList,
        setExpenseYearList,
        expenseMonthlyList,
        setExpenseMonthlyList,
    };

    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // retrieve total expense
        //const budgetPromise = getApi('budget/expense/');
        // retrieve list of last month expenses
        const lastMonthPromise = getApi('expense/lastmonth');
        // retrieve list of last year expenses
        const lastYearPromise = getApi('expense/lastyear');
        // retrieve total entries
        const allIncomesPromise = getApi('expense/');

        Promise.all([lastMonthPromise, lastYearPromise, allIncomesPromise])
            .then((responses) => {
                setExpenseMonthlyList(responses[0]);
                setExpenseYearList(responses[1]);
                setExpenseList(responses[2]);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            })
    }, []);

    useEffect(() => {
        getApi('budget/expense/')
            .then((res) => {
                setExpense(res.totalExpenses);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [expenseList]);

    if (loading) {
        return <Loading color='#CE310E'/>
    }

    return (
        <>
            <Box className='window'>
                <ExpenseListContext.Provider value={expenseValue}>
                    <AddExpenseDialog setOpen={setOpen} isOpen={open}/>
                    <Sidebar/>
                    <Box className='main-content' sx={{
                        border: '3px solid',
                        borderColor: '#CE310E', margin: '1rem',
                        borderRadius: '20px',
                        padding: '1rem',
                        overflowY: 'auto'
                    }}>
                        <TabContext value={value}>
                            <Box sx={{borderBottom: 1, borderColor: 'divider', width: '100%', display: 'flex'}}>
                                <TabList onChange={handleChange} indicatorColor="secondary" textColor="secondary">
                                    <Tab label="Ultimo mese" value='0'/>
                                    <Tab label="Ultimo anno" value='1'/>
                                </TabList>
                            </Box>
                            <TabPanel value="0">
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    flexWrap: 'wrap'
                                }}>
                                    <Box sx={{
                                        textAlign: 'center',
                                        width: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyItems: 'center',
                                        flexDirection: 'column'
                                    }}>
                                        <Typography variant='h5' sx={{mt: 2, mb: 2}}>Spese totali nell'ultimo
                                            mese</Typography>
                                        <h2>{expenseTotal} €</h2>
                                        <Box sx={{ml: '2.2rem', mt: '2rem'}}>
                                            {expenseMonthlyList && <ExpensePie isMonthly={true}/>}
                                        </Box>
                                    </Box>
                                    {expenseMonthlyList && <ExpenseAccordion isMonthly={true}/>}
                                    <Fab onClick={handleOpen} color='secondary' sx={{
                                        position: 'absolute',
                                        top: '87vh'
                                    }}>
                                        <AddRoundedIcon/>
                                    </Fab>
                                </Box>
                            </TabPanel>
                            <TabPanel value="1">
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    width: '100%',
                                    flexWrap: 'wrap'
                                }}>
                                    <Box sx={{
                                        textAlign: 'center',
                                        width: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyItems: 'center',
                                        flexDirection: 'column'
                                    }}>
                                        <Typography variant='h5' sx={{mt: 2, mb: 2}}>Entrate totali nell'ultimo
                                            anno</Typography>
                                        <h2>{expenseTotal} €</h2>
                                        <Box sx={{ml: '2.2rem', mt: '2rem'}}>
                                            {expenseYearList && <ExpensePie isMonthly={false}/>}
                                        </Box>
                                    </Box>
                                    {expenseYearList && <ExpenseAccordion isMonthly={false}/>}
                                    <Fab onClick={handleOpen} color='secondary' sx={{
                                        position: 'absolute',
                                        top: '87vh'
                                    }}>
                                        <AddRoundedIcon/>
                                    </Fab>
                                </Box>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </ExpenseListContext.Provider>
            </Box>
        </>
    );
}