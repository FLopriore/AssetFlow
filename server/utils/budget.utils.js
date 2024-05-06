// Calculates the total budget
function sumEntries(budgetEntriesList) {
    const incomeList = budgetEntriesList[0];
    const expenseList = budgetEntriesList[1];

    // if the lists are empty, totalIncomes and totalExpenses = 0
    const totalIncomes = getTotal(incomeList, 'positiveAmount');
    const totalExpenses = getTotal(expenseList, 'negativeAmount');
    return totalIncomes + totalExpenses;
}

// Returns the sum of the field values of the array.
//
// Params:
// - array: list of objects, each containing 'field'
// - field: string that specifies which value has to be summed
// -------------------------------------------------
// Example:
// const array = [
//     {name: "Mario", budgetEntry: 15},
//     {name: "Mario", budgetEntry: 30},
//     {name: "Mario", budgetEntry: 10},
// ];
// field in this case can be 'budgetEntry'. The function will return 15 + 30 + 10 = 55).
function getTotal(array, field) {
    if (array.length === 0) {
        return 0;
    }
    return array.reduce((accum, current) => accum + current[field], 0)
}

module.exports = {sumEntries, getTotal};