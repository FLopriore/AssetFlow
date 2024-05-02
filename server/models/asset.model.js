import mongoose from "mongoose";

// Investment asset model
const assetSchema = new mongoose.Schema({
    tracker: {
        type: String,
        required: true,
    },
    investedCapital: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
})

const Asset = mongoose.model('Asset', assetSchema);
export default Asset;