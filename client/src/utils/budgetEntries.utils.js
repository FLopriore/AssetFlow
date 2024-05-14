// Returns useful data of latest 6 budget entries.
// Data is necessary for PieCharts
function getLatestEntriesData(budgetEntriesList, isPositive) {
    const data = [];
    if (budgetEntriesList && budgetEntriesList.length >= 0) {
        budgetEntriesList = budgetEntriesList.sort((a, b) => {
            const firstDate = new Date(a.createdAt);
            const secondDate = new Date(b.createdAt);
            return secondDate - firstDate;
        });
        budgetEntriesList.forEach((el, index) => {
            if (index <= 5) {
                const dataElement = {id: index, label: el.description};
                dataElement.value = (isPositive) ? el.positiveAmount : el.negativeAmount * (-1);
                data.push(dataElement);
            }
        })
    }
    return data;
}

function calculateTotalCategory(budgetEntriesList, category) {
    let total = 0;
    if(budgetEntriesList){
    budgetEntriesList.forEach((el) => {
        if (el.positiveAmount && el.category === category) {
            total += el.positiveAmount;
        } else {
            if (el.category === category) total += el.negativeAmount * (-1);
        }
    });}
    return total;
}

export {getLatestEntriesData, calculateTotalCategory};