import * as React from 'react';
import {PieChart} from '@mui/x-charts/PieChart';

export function IncomePie({incomesList}) {

    const data = [
        {id: 0, value: calculateTotalCategory(incomesList, 'stipendio'), label: 'Stipendio'},
        {id: 1, value: calculateTotalCategory(incomesList, 'sell_asset'), label: 'Vendita asset'},
        {id: 2, value: calculateTotalCategory(incomesList, 'regali'), label: 'Regali'},
        {id: 3, value: calculateTotalCategory(incomesList, 'dividendi'), label: 'Dividendi'},
        {id: 4, value: calculateTotalCategory(incomesList, 'others'), label: 'Altro'},
    ];
    return (
        <PieChart
            colors={['#61C86A', '#81ff7a', '#009b7e', '#9adcbf', '#039655']}
            series={[
                {
                    data: data,
                    innerRadius: 87,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -90,
                    endAngle: 180,
                    cx: 150,
                    cy: 150,
                },
            ]}
            width={300}
            height={300}
            slotProps={{legend: {hidden: true}}}  // nasconde la legenda
        />
    );
}

export function ExpensePie({expensesList}) {
    const data = [
        {id: 0, value: calculateTotalCategory(expensesList, 'shopping'), label: 'Shopping'},
        {id: 1, value: calculateTotalCategory(expensesList, 'bollette'), label: 'Bollette'},
        {id: 2, value: calculateTotalCategory(expensesList, 'affitto'), label: 'Affitto'},
        {id: 3, value: calculateTotalCategory(expensesList, 'buy_asset'), label: 'Acquisto asset'},
        {id: 4, value: calculateTotalCategory(expensesList, 'others'), label: 'Altro'},
    ];
    return (
        <PieChart
            colors={['#ff9c83', '#ff0000', '#b71000', '#ff5e00', '#FF5747']}
            series={[
                {
                    data: data,
                    innerRadius: 87,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: 70,
                    endAngle: 365,
                    cx: 150,
                    cy: 150,
                },
            ]}
            width={300}
            height={300}
            slotProps={{legend: {hidden: true}}}  // nasconde la legenda
        />
    );
}

export function HomeGreenPie({incomesList}) {

    const data = [
        {id: 0, value: incomesList[0].positiveAmount},
        {id: 1, value: incomesList[1].positiveAmount},
        {id: 2, value: incomesList[2].positiveAmount},
        {id: 3, value: incomesList[3].positiveAmount},
        {id: 4, value: incomesList[4].positiveAmount},
    ];

    return (
        <PieChart
            colors={['#61C86A', '#81ff7a', '#009b7e', '#9adcbf', '#039655']}
            series={[
                {
                    data: data,
                    innerRadius: 87,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: -90,
                    endAngle: 180,
                    cx: 150,
                    cy: 150,
                },
            ]}
            width={300}
            height={300}
            slotProps={{legend: {hidden: true}}}  // nasconde la legenda
        />
    );
}

export function HomeRedPie({expensesList}) {
    const data = [
        {id: 0, value: expensesListList[0].negativeAmount},
        {id: 1, value: expensesListList[1].negativeAmount},
        {id: 2, value: expensesListList[2].negativeAmount},
        {id: 3, value: expensesListList[3].negativeAmount},
        {id: 4, value: expensesListList[4].negativeAmount},
    ];

    return (
        <PieChart
            colors={['#ff9c83', '#ff0000', '#b71000', '#ff5e00', '#FF5747']}
            series={[
                {
                    data: data,
                    innerRadius: 87,
                    outerRadius: 100,
                    paddingAngle: 5,
                    cornerRadius: 5,
                    startAngle: 70,
                    endAngle: 365,
                    cx: 150,
                    cy: 150,
                },
            ]}
            width={300}
            height={300}
            slotProps={{legend: {hidden: true}}}  // nasconde la legenda
        />
    );
}


// TODO: fix errors when server is down (?)
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

