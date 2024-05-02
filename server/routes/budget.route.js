const express = require("express");
const router = express.Router();
const getBudgetEntries = require("../controllers/budget.controller.js");

router.get("/",getBudgetEntries);

module.exports = router