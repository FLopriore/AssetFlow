const mongoose = require('mongoose');

// Income model
const incomeSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            enum: {
                values: ['stipendio', 'sell_asset', 'regali', 'dividendi', 'others'],
                message: 'Category not supported!'
            }
        },
        positiveAmount: {
            type: Number,
            required: true,
            min: [0, 'The amount must be positive!'],
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

const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;