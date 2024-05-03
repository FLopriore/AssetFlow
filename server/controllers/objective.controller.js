const Objective = require("../models/objective.model.js");

// Gets all the objectives
const getAllObjectives = async (req, res) => {
    try {
        const allObjectives = await Objective.find({});

        if (!allObjectives) {
            return res.status(404).json({message: 'Objectives not found!'});
        }
        res.status(200).json(allObjectives);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Gets an objective by its own ID
const getObjectiveById = async (req, res) => {
    try {
        const {id} = req.params;  // destructure id from params
        const objective = await Objective.findById(id);

        if (!objective) {
            return res.status(404).json({message: 'Objective'});
        }
        res.status(200).json(objective);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Adds a new objective and returns it.
const addObjective = async (req, res) => {
    try {
        const objectiveContent = req.body;
        const newObjectiveAdded = await Objective.create(objectiveContent);
        res.status(200).json(newObjectiveAdded);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

// Deletes an objective
const deleteObjective = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedObjective = await Objective.findByIdAndDelete(id);

        if (!deletedObjective) {
            return res.status(404).json({message: 'Objective not found!'});
        }
        res.status(200).json({message: 'Objective deleted!'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

module.exports = {getObjectiveById, addObjective, deleteObjective, getAllObjectives};