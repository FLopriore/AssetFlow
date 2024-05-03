const express = require("express");
const router = express.Router();
const {CreateUser,AuthUser} = require("../controllers/user.controller.js");

router.post("/create",CreateUser);
router.post("/login",AuthUser);

module.exports = router;