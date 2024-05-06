const Income = require("../models/income.model.js");
const mongoose = require("mongoose");

// Gets all the incomes
// TODO: set a limit of entries
// TODO: get values in a time frame
const getAllIncomes = async (req, res) => {
    try {
        const allIncomes = await Income.find({userId: req.userId});

        if (!allIncomes.length) {
            return res.status(404).json({message: 'Incomes not found!'});
        }
        res.status(200).json(allIncomes);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Gets an income by its own ID
const getIncomeById = async (req, res) => {
    try {
        const {id} = req.params;  // destructure id from params
        const income = await Income.findOne({
            _id: new mongoose.Types.ObjectId(id),
            userId: req.userId,
        });

        if (!income) {
            return res.status(404).json({message: 'Income not found!'});
        }
        res.status(200).json(income);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Adds a new income and returns it.
const addIncome = async (req, res) => {
    try {
        const incomeContent = {
            category: req.body.category,
            positiveAmount: req.body.positiveAmount,
            description: req.body.description,
            userId: req.userId,
        };
        const newIncomeAdded = await Income.create(incomeContent);
        res.status(200).json(newIncomeAdded);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Deletes an income source.
const deleteIncome = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedIncome = await Income.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(id),
            userId: req.userId,
        });

        if (!deletedIncome) {
            return res.status(404).json({message: 'Income not found!'});
        }
        res.status(200).json({message: 'Income deleted!'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

module.exports = {getIncomeById, addIncome, deleteIncome, getAllIncomes};