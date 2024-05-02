import mongoose from "mongoose";

// Income model
const incomeSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
        },
        positiveAmount: {
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

const Income = mongoose.model("Income", incomeSchema);
export default Income;