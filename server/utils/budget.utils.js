// Calculates the total budget
function sumEntries(budgetEntriesList) {
    const incomeList = budgetEntriesList[0];
    const expenseList = budgetEntriesList[1];

    // if the lists are empty, totalIncomes and totalExpenses = 0
    const totalIncomes = (incomeList.length === 0) ? 0 : incomeList.reduce((accum, current) => accum + current['positiveAmount'], 0);
    const totalExpenses = (expenseList.length === 0) ? 0 : expenseList.reduce((accum, current) => accum + current['negativeAmount'], 0);
    return totalIncomes + totalExpenses;
}

module.exports = {sumEntries};