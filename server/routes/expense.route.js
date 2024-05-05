const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {getExpenseById, addExpense, deleteExpense, getAllExpenses} = require("../controllers/expense.controller.js")

router.get("/", verifyToken, getAllExpenses);
router.get("/:id", verifyToken, getExpenseById);

router.post("/", verifyToken, addExpense);

router.delete("/:id", verifyToken, deleteExpense);

module.exports = router;