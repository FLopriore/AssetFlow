const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {
    getIncomeById,
    addIncome,
    deleteIncome,
    getAllIncomes,
    getLastMonthIncomes,
    getLastYearIncomes, deleteManyIncomes
} = require("../controllers/income.controller")

router.use(verifyToken);

router.get("/", getAllIncomes);
router.get("/lastmonth", getLastMonthIncomes);
router.get("/lastyear", getLastYearIncomes);
router.get("/:id", getIncomeById);

router.post("/", addIncome);

router.put("/delete", deleteManyIncomes);

router.delete("/:id", deleteIncome);

module.exports = router;