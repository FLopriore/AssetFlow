const mongoose = require('mongoose');

// Objective model
const objectiveSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        percentage: {
            type: Number,
            required: true,
            min: [0, 'Percentage must be between 0 and 100!'],
            max: [100, 'Percentage must be between 0 and 100!'],
        },
        objectiveMoney: {
            type: Number,
            required: true,
        },
        savedMoney: {
            type: Number,
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

const Objective = mongoose.model('Objective', objectiveSchema);

module.exports = Objective;