const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {
    getObjectiveById,
    addObjective,
    deleteObjective,
    getAllObjectives,
    modifyObjectivePercentages
} = require("../controllers/objective.controller.js")

router.use(verifyToken);

router.get("/", getAllObjectives);
router.get("/:id", getObjectiveById);

router.post("/", addObjective);

router.put("/percent", modifyObjectivePercentages);

router.delete("/:id", deleteObjective);

module.exports = router