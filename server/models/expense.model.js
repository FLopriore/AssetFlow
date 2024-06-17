const mongoose = require('mongoose');

// Expense model
const expenseSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            enum: {
                values: ['shopping', 'bollette', 'affitto', 'buy_asset', 'others'],
                message: 'Category not supported!'
            }
        },
        negativeAmount: {
            type: Number,
            required: true,
            max: [0, 'The amount must be negative!'],
        },
        description: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true
    },
);

const Expense = mongoose.model("Expense", expenseSchema);
module.exports = Expense;