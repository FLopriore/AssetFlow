import * as React from 'react';
import {useEffect, useState} from 'react';
import Sidebar from './Sidebar';
import {Box, Fab, Tab} from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {IncomePie} from './PieChart';
import getApi from '../utils/api.utils';
import IncomeAccordion from './Accordion';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';

export default function Income() {
    const [value, setValue] = useState('0');
    const [incomeList, setIncomeList] = useState([]);
    const [incomeTotal, setIncome] = useState(0);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // retrieve total income
        getApi('budget/income/').then((data) => {
            setIncome(data.totalIncome);
        });

        // retrieve list of income sources
        getApi('income/').then((data) => {
            setIncomeList(data);
        });
    }, []);

    return (
        <>
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
                                    <IncomePie incomesList={incomeList}/>
                                </Box>
                            </Box>
                            <IncomeAccordion incomeList={incomeList}/>
                            <Fab onClick={handleOpen} color='primary' sx={{
                                position: 'absolute',
                                top: '87%',
                                left: '20%'
                            }}>
                                <AddIcon />
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
                                <h3>Entrate totali nel mese di Aprile</h3>
                                <h2>+{incomeTotal}</h2>
                                <Box sx={{ml: '2.2rem', mt: '2rem'}}>
                                    <IncomePie incomesList={incomeList}/>
                                </Box>
                            </Box>
                            <IncomeAccordion incomeList={incomeList}/>
                            <Fab onClick={handleOpen} color='primary' sx={{
                                position: 'absolute',
                                top: '87%',
                                left: '20%'
                            }}>
                                <AddIcon />
                            </Fab>
                        </Box>
                    </TabPanel>
                </TabContext>
            </Box>
        </Box>
        </>
    );
}