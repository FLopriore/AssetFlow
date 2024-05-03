const Income = require("../models/income.model.js");
const Expense = require("../models/expense.model.js");

// TODO: check if the promises work well, especially 'res.status(200).json(responses)'
const getBudgetEntries = (req, res) => {
    const incomesPromise = Income.find({}).exec();  // exec() is necessary to get promises from queries
    const expensePromise = Expense.find({}).exec();

    Promise.all([incomesPromise, expensePromise])
        .then( (responses) => {
            res.status(200).json(responses);
        })
        .catch((e) => res.status(500).json({message: e.message}));
};

module.exports = {getBudgetEntries};