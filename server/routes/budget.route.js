const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {getBudgetEntries, getTotalBudget, getTotalExpenses, getTotalIncome} = require("../controllers/budget.controller.js");

router.get("/", verifyToken, getBudgetEntries);
router.get("/total", verifyToken, getTotalBudget);
router.get("/income", verifyToken, getTotalIncome);
router.get("/expense", verifyToken, getTotalExpenses);

module.exports = router