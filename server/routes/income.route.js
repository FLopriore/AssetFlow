const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {getIncomeById, addIncome, deleteIncome, getAllIncomes} = require("../controllers/income.controller.js")

router.use(verifyToken);

router.get("/", getAllIncomes);
router.get("/:id", getIncomeById);

router.post("/", addIncome);

router.delete("/:id", deleteIncome);

module.exports = router;