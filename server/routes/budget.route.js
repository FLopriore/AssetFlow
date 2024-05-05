const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {getBudgetEntries, getTotalBudget} = require("../controllers/budget.controller.js");

router.get("/", verifyToken, getBudgetEntries);
router.get("/total", verifyToken, getTotalBudget);

module.exports = router