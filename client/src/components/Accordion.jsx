import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
import getApi from '../utils/api.utils';
import { useState, useEffect } from 'react';
import BudgetTable from './Table';

function calculateTotalCategory(budgetEntriesList, category) {
    let total = 0;
    budgetEntriesList.forEach((el) => {
        if (el.positiveAmount && el.category === category) {
            total += el.positiveAmount;
        } else {
            if (el.category === category) total += el.negativeAmount * (-1);
        }
    });
    return total;
}

function getCategory(budgetEntriesList, category) {
    let cat = [];
    budgetEntriesList.forEach((el, idx) => {
        if(el.category === category) {
            const dataEntry = {id: idx, label: el.description, value: el.positiveAmount};
            cat.push(dataEntry);
        }
    })
    return cat;
}

export default function IncomeAccordion() {

    const [incomeList, setIncomeList] = useState([]);
    useEffect(() => {
        // retrieve list of income sources
        getApi('income/').then((data) => {
            setIncomeList(data);
        });
    }, []);

    const stipendioArr = getCategory(incomeList, 'stipendio');
    const assetArr = getCategory(incomeList, 'sell_asset');
    const regaliArr = getCategory(incomeList, 'regali');
    const dividendiArr = getCategory(incomeList, 'dividendi');
    const othersArr = getCategory(incomeList, 'others');

  return (
    <Box sx={{
        width: '50%',
        height: '100%'
    }}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
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
          expandIcon={<ExpandMoreIcon />}
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
          expandIcon={<ExpandMoreIcon />}
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
          expandIcon={<ExpandMoreIcon />}
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
          expandIcon={<ExpandMoreIcon />}
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
