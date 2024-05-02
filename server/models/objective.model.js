import mongoose from "mongoose";

// Objective model
const objectiveSchema = new mongoose.Schema({
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
})

const Objective = mongoose.model('Objective', objectiveSchema);

export default Objective;