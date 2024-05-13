const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {
    getExpenseById,
    addExpense,
    deleteExpense,
    getAllExpenses,
    getLastMonthExpenses,
    getLastYearExpenses,
    deleteManyExpenses
} = require("../controllers/expense.controller.js")

router.use(verifyToken);

router.get("/", getAllExpenses);
router.get("/lastmonth", getLastMonthExpenses);
router.get("/lastyear", getLastYearExpenses);
//Lascia la route id per ultima perchè il controllo delle route avviene in maniera ordinata
router.get("/:id", getExpenseById);


router.post("/", addExpense);

router.put("/delete", deleteManyExpenses);

router.delete("/:id", deleteExpense);

module.exports = router;