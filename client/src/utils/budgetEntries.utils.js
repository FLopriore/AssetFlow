// Returns useful data of latest 6 budget entries.
// Data is necessary for PieCharts
function getLatestEntriesData(budgetEntriesList, isPositive) {
    const data = [];
    if (budgetEntriesList.length) {
        budgetEntriesList.forEach((el, index) => {
            if (index <= 5) {
                const dataElement = {id: index, label: el.description};
                dataElement.value = (isPositive) ? el.positiveAmount : el.negativeAmount*(-1);
                data.push(dataElement);
            }
        })
    }
    return data;
}

export default getLatestEntriesData;