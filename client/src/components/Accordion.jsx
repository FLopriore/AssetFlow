import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/material';
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
    let data = [];
    if(budgetEntriesList.lenght!==0){
      budgetEntriesList.forEach((el, idx) => {
        if(el.category === category) {
            const dataEntry = {id: idx, label: el.description, value: el.positiveAmount};
            data.push(dataEntry);
        }
    })
    }
    return data;
}

export function IncomeAccordion({incomeList}) {
    
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

export function ExpenseAccordion({expenseList}) {
    
  const shoppingArr = getCategory(expenseList, 'shopping');
  const bolletteArr = getCategory(expenseList, 'bollette');
  const affittoArr = getCategory(expenseList, 'affitto');
  const assetArr = getCategory(expenseList, 'buy_asset');
  const othersArr = getCategory(expenseList, 'others');

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
        Shopping: -{calculateTotalCategory(expenseList, 'shopping')}
      </AccordionSummary>
      <AccordionDetails>
      <BudgetTable budgetEntriesList={shoppingArr} isPositive={false}/>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
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
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        Affitto: -{calculateTotalCategory(expenseList, 'affitto')}
      </AccordionSummary>
      <AccordionDetails>
          <BudgetTable budgetEntriesList={affittoArr} isPositive={true}/>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3-content"
        id="panel3-header"
      >
        Acquisto asset: -{calculateTotalCategory(expenseList, 'asset')}
      </AccordionSummary>
      <AccordionDetails>
          <BudgetTable budgetEntriesList={assetArr} isPositive={false}/>
      </AccordionDetails>
    </Accordion>
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
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
