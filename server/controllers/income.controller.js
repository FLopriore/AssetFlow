const Income = require("../models/income.model.js");
const mongoose = require("mongoose");
const {filterResponse} = require("../utils/response.utils");
const dayjs = require("dayjs");

// Gets all the incomes
const getAllIncomes = async (req, res) => {
    try {
        let allIncomes = await Income.find({userId: req.userId});

        if (!allIncomes.length) {
            return res.status(404).json({message: 'Incomes not found!'});
        }
        allIncomes = filterResponse(allIncomes, ['_id', 'category', 'positiveAmount', 'description', 'createdAt']);
        res.status(200).json(allIncomes);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Gets an income by its own ID
const getIncomeById = async (req, res) => {
    try {
        const {id} = req.params;  // destructure id from params
        let income = await Income.findOne({
            _id: new mongoose.mongo.ObjectId(id),
            userId: req.userId,
        });

        if (!income) {
            return res.status(404).json({message: 'Income not found!'});
        }
        income = {
            _id: income._id,
            category: income.category,
            positiveAmount: income.positiveAmount,
            description: income.description
        };
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
        let newIncomeAdded = await Income.create(incomeContent);
        newIncomeAdded = {
            _id: newIncomeAdded._id,
            category: newIncomeAdded.category,
            positiveAmount: newIncomeAdded.positiveAmount,
            description: newIncomeAdded.description
        };
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
            _id: new mongoose.mongo.ObjectId(id),
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

const getLastMonthIncomes = async (req, res) => {
    try {
        const today = dayjs();
        const lastMonthDate = today.subtract(30, 'day');

        let allIncomes = await Income.find({userId: req.userId, createdAt: {$gte: lastMonthDate}});

        if (!allIncomes.length) {
            return res.status(404).json({message: 'Incomes not found!'});
        }
        allIncomes = filterResponse(allIncomes, ['_id', 'category', 'positiveAmount', 'description', 'createdAt']);
        res.status(200).json(allIncomes);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

const getLastYearIncomes = async (req, res) => {
    try {
        const today = dayjs();
        const lastYearDate = today.subtract(1, 'year');

        let allIncomes = await Income.find({userId: req.userId, createdAt: {$gte: lastYearDate}});

        if (!allIncomes.length) {
            return res.status(404).json({message: 'Incomes not found!'});
        }
        allIncomes = filterResponse(allIncomes, ['_id', 'category', 'positiveAmount', 'description', 'createdAt']);
        res.status(200).json(allIncomes);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

const deleteManyIncomes = async (req, res) => {
    try {
        const incomesIds = req.body.map((el) => new mongoose.mongo.ObjectId(el._id));
        const deletedCount = await Income.deleteMany({
            _id: {
                $in: incomesIds
            },
            userId: req.userId,
        });

        if (deletedCount < incomesIds.length) {
            return res.status(404).json({message: 'Some income sources were not found!'});
        }

        res.status(200).json({message: 'All income sources deleted!'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

module.exports = {
    getIncomeById,
    addIncome,
    deleteIncome,
    getAllIncomes,
    getLastMonthIncomes,
    getLastYearIncomes,
    deleteManyIncomes
};