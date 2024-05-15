import * as React from 'react';
import {PieChart} from '@mui/x-charts/PieChart';
import {calculateTotalCategory} from "../utils/budgetEntries.utils.js";
import { useContext } from 'react';
import { IncomeListContext, ExpenseListContext } from './ListContext.jsx';

export function IncomePie({isMonthly}) {
    const { incomeMonthlyList, incomeYearList } = useContext(IncomeListContext)
    let list;
    isMonthly? list = incomeMonthlyList : list = incomeYearList

    const data = [
        {id: 0, value: calculateTotalCategory(list, 'stipendio'), label: 'Stipendio'},
        {id: 1, value: calculateTotalCategory(list, 'sell_asset'), label: 'Vendita asset'},
        {id: 2, value: calculateTotalCategory(list, 'regali'), label: 'Regali'},
        {id: 3, value: calculateTotalCategory(list, 'dividendi'), label: 'Dividendi'},
        {id: 4, value: calculateTotalCategory(list, 'others'), label: 'Altro'},
    ];
    return (
        <PieChart
            colors={['#61C86A', '#81ff7a', '#009b7e', '#9adcbf', '#039655']}
            series={[
                {
                    data: data,
                    innerRadius: 24,
                    outerRadius: 150,
                    paddingAngle: 4,
                    cornerRadius: 5,
                    startAngle: -90,
                    endAngle: 270,
                    cx: 150,
                    cy: 150,
                },
            ]}
            width={350}
            height={350}
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
                    innerRadius: 24,
                    outerRadius: 150,
                    paddingAngle: 4,
                    cornerRadius: 5,
                    startAngle: -90,
                    endAngle: 270,
                    cx: 150,
                    cy: 150,
                },
            ]}
            width={350}
            height={350}
            slotProps={{legend: {hidden: true}}}  // nasconde la legenda
        />
    );
}

export function HomeGreenPie({data}) {
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

export function HomeRedPie({data}) {
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
