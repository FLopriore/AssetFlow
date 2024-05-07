const express = require("express");
const router = express.Router();
const verify = require("../controllers/verify.controller.js");

router.get("/",verify);

module.exports = router;