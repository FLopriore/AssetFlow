import mongoose from "mongoose";

// Budget Entry (incomes and expenses) model
const budgetEntrySchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    }
})

const BudgetEntry = mongoose.model("BudgetEntry", budgetEntrySchema);
export default BudgetEntry;