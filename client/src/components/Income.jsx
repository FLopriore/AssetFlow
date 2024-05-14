import * as React from 'react';
import {useEffect, useState, useContext, createContext} from 'react';
import Sidebar from './Sidebar';
import {Box, Fab, Tab} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { IncomePie } from './PieChart';
import {getApi} from '../utils/api.utils';
import { IncomeAccordion } from './Accordion';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddIncomeDialog from "./AddIncomeDialog.jsx";
import { ListContext } from './ListContext.jsx';

export default function Income() {

    const [value, setValue] = useState('0');
    const [incomeMonthlyList, setIncomeMonthlyList] = useState([]);
    const [incomeYearList, setIncomeYearList] = useState([]);
    const [incomeList, setIncomeList] = useState([]);
    const [incomeTotal, setIncome] = useState(0);
    const listValue = { incomeList, setIncomeList }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // retrieve total income
        getApi('budget/income/').then((data) => {
            setIncome(data.totalIncome);
        });

        // retrieve list of last month income sources
        getApi('income/lastmonth').then((data) => {
            setIncomeMonthlyList(data);
        });

        // retrieve list of last year income sources
        getApi('income/lastyear').then((data) => {
            setIncomeYearList(data);
        });

        // retrieve total entries
        getApi('income/').then((data) => {
            setIncomeList(data);
        });
    }, []);

    return (
        <>
        <Box className='window'>
            <AddIncomeDialog setOpen={setOpen} isOpen={open} incomeList={incomeMonthlyList} setIncomeList={setIncomeMonthlyList}/>
            <Sidebar/>
            <Box className='main-content' sx={{
                border: '3px solid',
                borderColor: '#61c86a', margin: '1rem',
                borderRadius: '20px',
                padding: '1rem',
                overflowY: 'auto'
            }}>
            <ListContext.Provider value={listValue}>
                <TabContext value={value}>
                    <Box sx={{borderBottom: 1, borderColor: 'divider', width: '100%', display: 'flex'}}>
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
                            <Box sx={{
                                textAlign: 'center',
                                width: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyItems: 'center',
                                flexDirection: 'column'
                            }}>
                                <h3>Entrate totali nel mese di Aprile</h3>
                                <h2>+{incomeTotal}</h2>
                                <Box sx={{ml: '2.2rem', mt: '2rem'}}>
                                    {incomeMonthlyList && <IncomePie incomesList={incomeMonthlyList}/>}
                                </Box>
                            </Box>
                            {incomeMonthlyList && <IncomeAccordion incomeList={incomeMonthlyList}/>}
                            <Fab onClick={handleOpen} color='primary' sx={{
                                position: 'absolute',
                                top: '87vh'
                            }}>
                                <AddRoundedIcon />
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
                                <h3>Entrate totali nell'anno 2023</h3>
                                <h2>+{incomeTotal}</h2>
                                <Box sx={{ml: '2.2rem', mt: '2rem'}}>
                                    {incomeYearList && <IncomePie incomesList={incomeYearList}/>}
                                </Box>
                            </Box>
                            {incomeYearList && <IncomeAccordion incomeList={incomeYearList}/>}
                            <Fab onClick={handleOpen} color='primary' sx={{
                                position: 'absolute',
                                top: '87vh'
                            }}>
                                <AddRoundedIcon />
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