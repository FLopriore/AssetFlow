import * as React from 'react';
import Sidebar from './Sidebar';
import { Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useEffect, useState} from "react";
import { IncomePie } from './PieChart';
import getApi from '../utils/api.utils';
import IncomeAccordion from './Accordion';

export default function Income() {
    const [value, setValue] = useState(0);
    const [incomeList, setIncomeList] = useState([]);
    const [incomeTotal, setIncome] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

    return (
        <Box className='window'>
            <Sidebar/>
            <Box className='main-content' sx={{
                border: '3px solid',
                borderColor: '#61c86a', margin: '1rem',
                borderRadius: '20px',
                padding: '1rem',
                overflowY: 'auto'
            }}>
                <TabContext value={value}>
                 <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                    <TabList onChange={handleChange}>
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
                        <IncomePie incomesList={incomeList} />
                        <Box sx={{
                            position: 'fixed',
                            textAlign: 'center',
                            top: '57%',
                        }}>
                            <h3 id='income-summary'>Entrate totali nel mese di Aprile</h3>
                            <h2>+{incomeTotal}</h2>
                        </Box>
                        <IncomeAccordion />
                    </Box>
                 </TabPanel>
                 <TabPanel value="1">
                 <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        flexWrap: 'wrap'
                    }}>
                        <IncomePie incomesList={incomeList} />
                        <Box sx={{
                            position: 'fixed',
                            textAlign: 'center',
                            top: '57%'
                        }}>
                            <h3 id='income-summary'>Entrate totali nell'anno: 2023</h3>
                            <h2>+{incomeTotal}</h2>
                        </Box>
                        <IncomeAccordion />
                    </Box>
                 </TabPanel>
                </TabContext>
            </Box>
        </Box>
    );
}