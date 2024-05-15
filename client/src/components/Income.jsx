import * as React from 'react';
import {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import {Box, Fab, Tab, Typography} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {IncomePie} from './PieChart';
import {getApi} from '../utils/api.utils';
import {IncomeAccordion} from './Accordion';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddIncomeDialog from "./AddIncomeDialog.jsx";
import Loading from "./Loading.jsx";
import {IncomeListContext} from './ListContext.jsx';

export default function Income() {

    const [value, setValue] = useState('0');
    const [incomeMonthlyList, setIncomeMonthlyList] = useState([]);
    const [incomeYearList, setIncomeYearList] = useState([]);
    const [incomeList, setIncomeList] = useState([]);
    const [incomeTotal, setIncome] = useState(0);

    const incomesValue = {
        incomeList,
        setIncomeList,
        incomeMonthlyList,
        setIncomeMonthlyList,
        incomeYearList,
        setIncomeYearList
    }

    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // retrieve total income
        const budgetPromise = getApi('budget/income/');
        // retrieve list of last month income sources
        const lastMonthPromise = getApi('income/lastmonth');
        // retrieve list of last year income sources
        const lastYearPromise = getApi('income/lastyear');
        // retrieve total entries
        const allIncomesPromise = getApi('income/');

        Promise.all([budgetPromise, lastMonthPromise, lastYearPromise, allIncomesPromise])
            .then((responses) => {
                setIncome(responses[0].totalIncome);
                setIncomeMonthlyList(responses[1]);
                setIncomeYearList(responses[2]);
                setIncomeList(responses[3]);
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
                <IncomeListContext.Provider value={incomesValue}>
                    <AddIncomeDialog setOpen={setOpen} isOpen={open}/>
                    <Sidebar/>
                    <Box className='main-content' sx={{
                        border: '3px solid',
                        borderColor: '#61c86a', margin: '1rem',
                        borderRadius: '20px',
                        padding: '1rem',
                        overflowY: 'auto'
                    }}>
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
                                        <Typography variant='h5' sx={{mt: 2, mb: 2}}>Entrate totali nell'ultimo
                                            mese</Typography>
                                        <h2>+{incomeTotal} €</h2>
                                        <Box sx={{ml: '2.2rem', mt: '2rem'}}>
                                            {incomeMonthlyList && <IncomePie isMonthly={true}/>}
                                        </Box>
                                    </Box>
                                    {incomeMonthlyList && <IncomeAccordion isMonthly={true}/>}
                                    <Fab onClick={handleOpen} color='primary' sx={{
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
                                        <h2>+{incomeTotal} €</h2>
                                        <Box sx={{ml: '2.2rem', mt: '2rem'}}>
                                            {incomeYearList && <IncomePie isMonthly={false}/>}
                                        </Box>
                                    </Box>
                                    {incomeYearList && <IncomeAccordion incomeList={incomeYearList}/>}
                                    <Fab onClick={handleOpen} color='primary' sx={{
                                        position: 'absolute',
                                        top: '87vh'
                                    }}>
                                        <AddRoundedIcon/>
                                    </Fab>
                                </Box>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </IncomeListContext.Provider>
            </Box>
        </>
    );
}