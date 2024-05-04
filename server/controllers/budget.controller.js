const Income = require("../models/income.model.js");
const Expense = require("../models/expense.model.js");

const getBudgetEntries = (req, res) => {
    const incomesPromise = Income.find({}).exec();  // exec() is necessary to get promises from queries
    const expensePromise = Expense.find({}).exec();

    Promise.all([incomesPromise, expensePromise])
        .then((responses) => {
            // Check if both income and expense responses are empty
            if (!responses[0].length && !!responses[1].length) {
                return res.status(404).json({message: "No budget entries found!"});
            }
            res.status(200).json(responses);
        })
        .catch((e) => res.status(500).json({message: e.message}));
};

module.exports = {getBudgetEntries};