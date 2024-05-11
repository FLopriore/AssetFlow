const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {getExpenseById, addExpense, deleteExpense, getAllExpenses, getLastMonthExpenses} = require("../controllers/expense.controller.js")

router.use(verifyToken);

router.get("/", getAllExpenses);
router.get("/:id", getExpenseById);
router.get("/lastmonth", getLastMonthExpenses);

router.post("/", addExpense);

router.delete("/:id", deleteExpense);

module.exports = router;