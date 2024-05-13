const Objective = require("../models/objective.model.js");
const mongoose = require("mongoose");
const {filterResponse} = require("../utils/response.utils");

// Gets all the objectives
const getAllObjectives = async (req, res) => {
    try {
        let allObjectives = await Objective.find({userId: req.userId});

        if (!allObjectives.length) {
            return res.status(404).json({message: 'Objectives not found!'});
        }
        allObjectives = filterResponse(allObjectives, ['_id', 'name', 'percentage', 'objectiveMoney', 'savedMoney', 'createdAt']);
        res.status(200).json(allObjectives);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Gets an objective by its own ID
const getObjectiveById = async (req, res) => {
    try {
        const {id} = req.params;  // destructure id from params
        let objective = await Objective.findOne({
            _id: new mongoose.mongo.ObjectId(id),
            userId: req.userId,
        });

        if (!objective) {
            return res.status(404).json({message: 'Objective not found!'});
        }
        objective = {
            _id: objective._id,
            name: objective.name,
            objectiveMoney: objective.objectiveMoney,
            percentage: objective.percentage,
            savedMoney: objective.savedMoney,
        };
        res.status(200).json(objective);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Adds a new objective and returns it.
const addObjective = async (req, res) => {
    try {
        const objectiveContent = {
            name: req.body.name,
            objectiveMoney: req.body.objectiveMoney,
            savedMoney: req.body.savedMoney,
            percentage: req.body.percentage,
            userId: req.userId,
        };
        let newObjectiveAdded = await Objective.create(objectiveContent);
        newObjectiveAdded = {
            _id: newObjectiveAdded._id,
            name: newObjectiveAdded.name,
            objectiveMoney: newObjectiveAdded.objectiveMoney,
            percentage: newObjectiveAdded.percentage,
            savedMoney: newObjectiveAdded.savedMoney,
        };
        res.status(200).json(newObjectiveAdded);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Deletes an objective
const deleteObjective = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedObjective = await Objective.findOneAndDelete({
            _id: new mongoose.mongo.ObjectId(id),
            userId: req.userId,
        });

        if (!deletedObjective) {
            return res.status(404).json({message: 'Objective not found!'});
        }
        res.status(200).json({message: 'Objective deleted!'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

const modifyObjectivePercentages = async (req, res) => {
    try {
        const objectivesList = req.body;
        const modifiedObjectives = [];
        for (const element of objectivesList) {
            const objective = await Objective.findOneAndUpdate(
                {
                    _id: new mongoose.mongo.ObjectId(element._id),
                    userId: req.userId,
                },
                {
                    percentage: element.percentage
                });
            modifiedObjectives.push(objective);
        }

        if (modifiedObjectives.length < objectivesList.length) {
            return res.status(404).json({success: false, message: "Some percentages were not updated."});
        }
        res.status(200).json({success: true, message: "All percentages were updated successfully."});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

module.exports = {getObjectiveById, addObjective, deleteObjective, getAllObjectives, modifyObjectivePercentages};