const Expense = require("../models/expense.model.js");
const mongoose = require('mongoose');
const {filterResponse} = require("../utils/response.utils");

// Gets all the expenses
const getAllExpenses = async (req, res) => {
    try {
        let allExpenses = await Expense.find({userId: req.userId});

        if (!allExpenses.length) {
            return res.status(404).json({message: 'Expenses not found!'});
        }
        allExpenses = filterResponse(allExpenses, ['_id', 'category', 'negativeAmount', 'description']);
        res.status(200).json(allExpenses);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Gets an expense by its own ID
const getExpenseById = async (req, res) => {
    try {
        const {id} = req.params;  // destructure id from params
        let expense = await Expense.findOne({
            _id: new mongoose.Types.ObjectId(id),
            userId: req.userId,
        });

        if (!expense) {
            return res.status(404).json({message: 'Expense not found!'});
        }
        expense = {
            _id: expense._id,
            category: expense.category,
            negativeAmount: expense.negativeAmount,
            description: expense.description,
        };
        res.status(200).json(expense);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Adds a new expense and returns it.
const addExpense = async (req, res) => {
    try {
        const expenseContent = {
            category: req.body.category,
            negativeAmount: req.body.negativeAmount,
            description: req.body.description,
            userId: req.userId,
        };
        let newExpenseAdded = await Expense.create(expenseContent);
        newExpenseAdded = {
            _id: newExpenseAdded._id,
            category: newExpenseAdded.category,
            negativeAmount: newExpenseAdded.negativeAmount,
            description: newExpenseAdded.description,
        };
        res.status(200).json(newExpenseAdded);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Deletes an expense
const deleteExpense = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedExpense = await Expense.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(id),
            userId: req.userId,
        });

        if (!deletedExpense) {
            return res.status(404).json({message: 'Expense not found!'});
        }
        res.status(200).json({message: 'Expense deleted!'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

module.exports = {getExpenseById, addExpense, deleteExpense, getAllExpenses};