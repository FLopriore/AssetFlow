const mongoose = require('mongoose');

// Objective model
const objectiveSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        objectiveMoney: {
            type: Number,
            required: true,
        },
        savedMoney: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true
    },
);

const Objective = mongoose.model('Objective', objectiveSchema);

module.exports = Objective;