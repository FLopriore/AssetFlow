const Asset = require("../models/asset.model.js");
const mongoose = require("mongoose");

// Gets all the invested assets
const getAllAssets = async (req, res) => {
    try {
        const allAssets = await Asset.find({userId: req.userId});

        if (!allAssets.length) {
            return res.status(404).json({message: 'Assets not found!'});
        }
        res.status(200).json(allAssets);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Gets an asset by its own ID
const getAssetById = async (req, res) => {
    try {
        const {id} = req.params;  // destructure id from params
        const asset = await Asset.findOne({
            _id: new mongoose.Types.ObjectId(id),
            userId: req.userId,
        });

        if (!asset) {
            return res.status(404).json({message: 'Asset not found!'});
        }
        res.status(200).json(asset);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Adds a new asset and returns it.
const addAsset = async (req, res) => {
    try {
        const assetContent = {
            tracker: req.body.tracker,
            investedCapital: req.body.investedCapital,
            userId: req.userId,
        };
        const newAssetAdded = await Asset.create(assetContent);
        res.status(200).json(newAssetAdded);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Deletes an asset
// This happens when the user decides to sell it.
const sellAsset = async (req, res) => {
    try {
        const {id} = req.params;
        const soldAsset = await Asset.findOneAndDelete({
            _id: new mongoose.Types.ObjectId(id),
            userId: req.userId,
        });

        if (!soldAsset) {
            return res.status(404).json({message: 'Asset not found!'});
        }
        res.status(200).json({message: 'Asset sold!'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

module.exports = {getAssetById, addAsset, sellAsset, getAllAssets};