const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {getIncomeById, addIncome, deleteIncome, getAllIncomes} = require("../controllers/income.controller.js")

router.get("/",verifyToken,getAllIncomes);
router.get("/:id",verifyToken,getIncomeById);

router.post("/",verifyToken,addIncome);

router.delete("/:id",verifyToken,deleteIncome);

module.exports = router;