const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {getBudgetEntries, getTotalBudget, getTotalExpenses, getTotalIncome} = require("../controllers/budget.controller.js");

router.use(verifyToken);

router.get("/", getBudgetEntries);
router.get("/total", getTotalBudget);
router.get("/income", getTotalIncome);
router.get("/expense", getTotalExpenses);

module.exports = router