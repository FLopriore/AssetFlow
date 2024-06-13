const mongoose = require('mongoose');

// Investment asset model
const assetSchema = new mongoose.Schema(
    {
        tracker: {
            type: String,
            required: true,
        },
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: 'User', //Associazione 1 a molti
            required: true, //validatore
        },
    },
    {
        timestamps: true,
    }
);

const Asset = mongoose.model('Asset', assetSchema);
module.exports = Asset;