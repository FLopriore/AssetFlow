const mongoose = require('mongoose');

// Expense model
const expenseSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        negativeAmount: {
            type: Number,
            required: true,
            default: 0,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true
    },
);

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;