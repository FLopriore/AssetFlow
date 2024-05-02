import Income from "../models/income.model.js";

// Gets all the incomes
// TODO: set a limit of entries
// TODO: get values in a time frame
const getAllIncomes = async (req, res) => {
    try {
        const allIncomes = await Income.find({});

        if (!allIncomes) {
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
        const income = await Income.findById(id);

        if (!income) {
            return res.status(404).json({message: 'Income'});
        }
        res.status(200).json(income);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Adds a new income and returns it.
const addIncome = async (req, res) => {
    try {
        const incomeContent = req.body;
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
        const deletedIncome = await Income.findByIdAndDelete(id);

        if (!deletedIncome) {
            return res.status(404).json({message: 'Income not found!'});
        }
        res.status(200).json({message: 'Income deleted!'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

export {getIncomeById, addIncome, deleteIncome, getAllIncomes};