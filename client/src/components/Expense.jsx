import * as React from 'react';
import {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import {Box, Fab, Tab} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {ExpensePie} from './PieChart';
import {getApi} from '../utils/api.utils';
import {ExpenseAccordion} from './Accordion';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddExpenseDialog from "./AddExpenseDialog.jsx";
import { ListContext } from './ListContext.jsx';

export default function Expense() {
    const [value, setValue] = useState('0');
    const [expenseYearList, setExpenseYearList] = useState([]);
    const [expenseTotal, setExpense] = useState(0);
    const [expenseMonthlyList, setExpenseMonthlyList] = useState([]);
    const [expenseList, setExpenseList] = useState([]);
    const listValue = { expenseList, setExpenseList }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // retrieve total income
        getApi('budget/expense/').then((data) => {
            if(!data.message){setExpense(data.totalExpenses);}
        });

        getApi('expense/lastyear').then((data) => {
            if(!data.message){setExpenseYearList(data);}
        });

        //retrieve last month expenses
        getApi('expense/lastmonth').then((data) => {
            if(!data.message){setExpenseMonthlyList(data);}
        });

        getApi('expense/').then((data) => {
            if(!data.message){setExpenseList(data);}
        });

    }, []);

    return (
        <>
            <Box className='window'>
                <AddExpenseDialog setOpen={setOpen} isOpen={open} expenseList={expenseMonthlyList}
                                  setExpenseList={setExpenseMonthlyList}/>
                <Sidebar/>
                <Box className='main-content' sx={{
                    border: '3px solid',
                    borderColor: '#CE310E', margin: '1rem',
                    borderRadius: '20px',
                    padding: '1rem',
                    overflowY: 'auto'
                }}>
                    <ListContext.Provider value={listValue}>
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
                                    <h3>Spese totali nel mese di Aprile</h3>
                                    <h2>{expenseTotal}</h2>
                                    <Box sx={{ml: '2.2rem', mt: '2rem'}}>
                                        {expenseMonthlyList && <ExpensePie expensesList={expenseMonthlyList}/>}
                                    </Box>
                                </Box>
                                {expenseMonthlyList && <ExpenseAccordion expenseList={expenseMonthlyList}/>}
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
                                    <h3>Spese totali nell'anno 2023</h3>
                                    <h2>{expenseTotal}</h2>
                                    <Box sx={{ml: '2.2rem', mt: '2rem'}}>
                                        {expenseYearList && <ExpensePie expensesList={expenseYearList}/>}
                                    </Box>
                                </Box>
                                {expenseYearList && <ExpenseAccordion expenseList={expenseYearList}/>}
                                <Fab onClick={handleOpen} color='secondary' sx={{
                                    position: 'absolute',
                                    top: '87vh'
                                }}>
                                    <AddRoundedIcon/>
                                </Fab>
                            </Box>
                        </TabPanel>
                    </TabContext>
                    </ListContext.Provider>
                </Box>
            </Box>
        </>
    );
}