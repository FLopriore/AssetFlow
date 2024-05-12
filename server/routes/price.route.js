const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken.js");
const {getMonthlyPrices} = require("../controllers/price.controller.js");

router.use(verifyToken);

router.get("/:id", getMonthlyPrices);

module.exports = router