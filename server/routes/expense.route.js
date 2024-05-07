const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {getExpenseById, addExpense, deleteExpense, getAllExpenses} = require("../controllers/expense.controller.js")

router.use(verifyToken);

router.get("/", getAllExpenses);
router.get("/:id", getExpenseById);

router.post("/", addExpense);

router.delete("/:id", deleteExpense);

module.exports = router;