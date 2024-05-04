const Expense = require("../models/expense.model.js");

// Gets all the expenses
const getAllExpenses = async (req, res) => {
    try {
        const allExpenses = await Expense.find({});

        if (!allExpenses.length) {
            return res.status(404).json({message: 'Expenses not found!'});
        }
        res.status(200).json(allExpenses);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Gets an expense by its own ID
const getExpenseById = async (req, res) => {
    try {
        const {id} = req.params;  // destructure id from params
        const expense = await Expense.findById(id);

        if (!expense) {
            return res.status(404).json({message: 'Expense not found!'});
        }
        res.status(200).json(expense);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Adds a new expense and returns it.
const addExpense = async (req, res) => {
    try {
        const expenseContent = req.body;
        const newExpenseAdded = await Expense.create(expenseContent);
        res.status(200).json(newExpenseAdded);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Deletes an expense
const deleteExpense = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedExpense = await Expense.findByIdAndDelete(id);

        if (!deletedExpense) {
            return res.status(404).json({message: 'Expense not found!'});
        }
        res.status(200).json({message: 'Expense deleted!'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

module.exports = {getExpenseById, addExpense, deleteExpense, getAllExpenses};