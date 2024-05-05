const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {getObjectiveById, addObjective, deleteObjective, getAllObjectives} = require("../controllers/objective.controller.js")

router.get("/",verifyToken,getAllObjectives);
router.get("/:id",verifyToken,getObjectiveById);

router.post("/",verifyToken,addObjective);

router.delete("/:id",verifyToken,deleteObjective);

module.exports = router