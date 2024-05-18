import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Box} from '@mui/material';
import { BudgetTable } from './Table';
import {calculateTotalCategory} from "../utils/budgetEntries.utils.js";
import { useContext } from 'react';
import { IncomeListContext, ExpenseListContext } from '../contexts/ListContext.jsx';

//TODO: spostare questa funzione in budget utils
function getCategory(budgetEntriesList, category, isPositive) {
    let data = [];
    if (budgetEntriesList.length !== 0) {
        budgetEntriesList.forEach((el, idx) => {
            if (el.category === category) {
                const dataEntry = {id: idx, label: el.description, dbId: el._id};
                dataEntry.value = (isPositive) ? el.positiveAmount : el.negativeAmount * (-1);
                data.push(dataEntry);
            }
        })
    }
    return data;
}

export function IncomeAccordion({isMonthly}) {
    const { incomeMonthlyList, incomeYearList } = useContext(IncomeListContext);
    const list = (isMonthly) ? incomeMonthlyList : incomeYearList;

    const stipendioArr = getCategory(list, 'stipendio', true);
    const assetArr = getCategory(list, 'sell_asset', true);
    const regaliArr = getCategory(list, 'regali', true);
    const dividendiArr = getCategory(list, 'dividendi', true);
    const othersArr = getCategory(list, 'others', true);

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
                    Stipendio: +{calculateTotalCategory(list, 'stipendio')}
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
                    Vendita asset: +{calculateTotalCategory(list, 'sell_asset')}
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
                    Regali: +{calculateTotalCategory(list, 'regali')}
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
                    Dividendi: +{calculateTotalCategory(list, 'dividendi')}
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
                    Altro: +{calculateTotalCategory(list, 'others')}
                </AccordionSummary>
                <AccordionDetails>
                    <BudgetTable budgetEntriesList={othersArr} isPositive={true}/>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}

export function ExpenseAccordion({isMonthly}) {
    const { expenseMonthlyList, expenseYearList } = useContext(ExpenseListContext);
    const list = (isMonthly) ? expenseMonthlyList : expenseYearList;

    const shoppingArr = getCategory(list, 'shopping', false);
    const bolletteArr = getCategory(list, 'bollette', false);
    const affittoArr = getCategory(list, 'affitto', false);
    const assetArr = getCategory(list, 'buy_asset', false);
    const othersArr = getCategory(list, 'others', false);

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
                    Shopping: -{calculateTotalCategory(list, 'shopping')}
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
                    Bollette: -{calculateTotalCategory(list, 'bollette')}
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
                    Affitto: -{calculateTotalCategory(list, 'affitto')}
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
                    Acquisto asset: -{calculateTotalCategory(list, 'buy_asset')}
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
                    Altro: -{calculateTotalCategory(list, 'others')}
                </AccordionSummary>
                <AccordionDetails>
                    <BudgetTable budgetEntriesList={othersArr} isPositive={false}/>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
}
