import { createContext } from 'react';

export const IncomeListContext = createContext({
    incomeList: [],
    setIncomeList: () => {},
    incomeMonthlyList: [],
    setIncomeMonthlyList: () => {},
    incomeYearList: [],
    setIncomeYearList: () => {},
    isPositive: true,
})

export const ExpenseListContext = createContext({
    expenseList: [],
    setExpenseList: () => {},
    expenseMonthlyList: [],
    setExpenseMonthlyList: () => {},
    expenseYearList: [],
    setExpenseYearList: () => {},
    isPositive: false,
})
