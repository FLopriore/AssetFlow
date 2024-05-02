const express = require("express");
const router = express.Router();
const {getExpenseById, addExpense, deleteExpense, getAllExpenses} = require("../controllers/expense.controller.js")

router.get("/",getAllExpenses);
router.get("/:id",getExpenseById);

router.post("/",addExpense);

router.delete("/:id",deleteExpense);

module.exports = router;