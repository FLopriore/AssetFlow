const express = require("express");
const router = express.Router();
const {getObjectiveById, addObjective, deleteObjective, getAllObjectives} = require("../controllers/objective.controller.js")

router.get("/",getAllObjectives);
router.get("/:id",getObjectiveById);

router.post("/",addObjective);

router.delete("/:id",deleteObjective);

module.exports = router