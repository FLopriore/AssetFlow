const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {getBudgetEntries} = require("../controllers/budget.controller.js");

router.get("/",verifyToken,getBudgetEntries);

module.exports = router