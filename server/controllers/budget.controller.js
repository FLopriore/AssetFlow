const Income = require("../models/income.model.js");
const Expense = require("../models/expense.model.js");
const sumEntries = require('../utils/budget.utils.js');

// Returns a list with all incomes and expenses
const getBudgetEntries = (req, res) => {
    const incomesPromise = Income.find({userId: req.userId}).exec();  // exec() is necessary to get promises from queries
    const expensePromise = Expense.find({userId: req.userId}).exec();

    Promise.all([incomesPromise, expensePromise])
        .then((responses) => {
            // Check if both income and expense responses are empty
            if (!responses[0].length && !responses[1].length) {
                return res.status(404).json({message: "No budget entries found!"});
            }
            res.status(200).json(responses);
        })
        .catch((e) => res.status(500).json({message: e.message}));
};

// Returns total budget (total incomes - total expenses)
const getTotalBudget = (req, res) => {
    const incomesPromise = Income.find({userId: req.userId}).exec();  // exec() is necessary to get promises from queries
    const expensePromise = Expense.find({userId: req.userId}).exec();

    Promise.all([incomesPromise, expensePromise])
        .then((budgetEntriesList) => {
            // Check if both income and expense responses are empty
            if (!budgetEntriesList[0].length && !budgetEntriesList[1].length) {
                return res.status(404).json({message: "No budget entries found!"});
            }
            const total = sumEntries(budgetEntriesList);

            const responseJson = {
                total: total
            };
            res.status(200).json(responseJson);
        })
        .catch((e) => res.status(500).json({message: e.message}));
};

module.exports = {getBudgetEntries, getTotalBudget};