import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Box} from '@mui/material';
import BudgetTable from './Table';
import {calculateTotalCategory} from "../utils/budgetEntries.utils.js";

function getCategory(budgetEntriesList, category, isPositive) {
    let data = [];
    if (budgetEntriesList.length !== 0) {
        budgetEntriesList.forEach((el, idx) => {
            if (el.category === category) {
                const dataEntry = {id: idx, label: el.description};
                dataEntry.value = (isPositive) ? el.positiveAmount : el.negativeAmount * (-1);
                data.push(dataEntry);
            }
        })
    }
    return data;
}

export function IncomeAccordion({incomeList}) {

    const stipendioArr = getCategory(incomeList, 'stipendio', true);
    const assetArr = getCategory(incomeList, 'sell_asset', true);
    const regaliArr = getCategory(incomeList, 'regali', true);
    const dividendiArr = getCategory(incomeList, 'dividendi', true);
    const othersArr = getCategory(incomeList, 'others', true);

    return (
        <Box sx={{
            width: '50%',
            height: '100%'
        }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Stipendio: +{calculateTotalCategory(incomeList, 'stipendio')}
                </AccordionSummary>
                <AccordionDetails>
                    <BudgetTable budgetEntriesList={stipendioArr} isPositive={true}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    Vendita asset: +{calculateTotalCategory(incomeList, 'sell_asset')}
                </AccordionSummary>
                <AccordionDetails>
                    <BudgetTable budgetEntriesList={assetArr} isPositive={true}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    Regali: +{calculateTotalCategory(incomeList, 'regali')}
                </AccordionSummary>
                <AccordionDetails>
                    <BudgetTable budgetEntriesList={regaliArr} isPositive={true}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    Dividendi: +{calculateTotalCategory(incomeList, 'dividendi')}
                </AccordionSummary>
                <AccordionDetails>
                    <BudgetTable budgetEntriesList={dividendiArr} isPositive={true}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    Altro: +{calculateTotalCategory(incomeList, 'others')}
                </AccordionSummary>
                <AccordionDetails>
                    <BudgetTable budgetEntriesList={othersArr} isPositive={true}/>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export function ExpenseAccordion({expenseList}) {

    const shoppingArr = getCategory(expenseList, 'shopping', false);
    const bolletteArr = getCategory(expenseList, 'bollette', false);
    const affittoArr = getCategory(expenseList, 'affitto', false);
    const assetArr = getCategory(expenseList, 'buy_asset', false);
    const othersArr = getCategory(expenseList, 'others', false);

    return (
        <Box sx={{
            width: '50%',
            height: '100%'
        }}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Shopping: -{calculateTotalCategory(expenseList, 'shopping')}
                </AccordionSummary>
                <AccordionDetails>
                    <BudgetTable budgetEntriesList={shoppingArr} isPositive={false}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    Bollette: -{calculateTotalCategory(expenseList, 'bollette')}
                </AccordionSummary>
                <AccordionDetails>
                    <BudgetTable budgetEntriesList={bolletteArr} isPositive={false}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    Affitto: -{calculateTotalCategory(expenseList, 'affitto')}
                </AccordionSummary>
                <AccordionDetails>
                    <BudgetTable budgetEntriesList={affittoArr} isPositive={false}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    Acquisto asset: -{calculateTotalCategory(expenseList, 'buy_asset')}
                </AccordionSummary>
                <AccordionDetails>
                    <BudgetTable budgetEntriesList={assetArr} isPositive={false}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel3-content"
                    id="panel3-header"
                >
                    Altro: -{calculateTotalCategory(expenseList, 'others')}
                </AccordionSummary>
                <AccordionDetails>
                    <BudgetTable budgetEntriesList={othersArr} isPositive={false}/>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
