import { createContext } from 'react';

export const ListContext = createContext({
    incomeList: [],
    setIncomeList: () => {},
    expenseList: [],
    setExpenseList: () => {}
})