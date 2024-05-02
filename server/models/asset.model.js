import mongoose from "mongoose";

// Investment asset model
const assetSchema = new mongoose.Schema(
    {
        tracker: {
            type: String,
            required: true,
        },
        investedCapital: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Asset = mongoose.model('Asset', assetSchema);
export default Asset;