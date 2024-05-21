const express = require("express");
const router = express.Router();
const {createUser, authUser} = require("../controllers/user.controller.js");

router.post("/signup", createUser);
router.post("/login", authUser);

module.exports = router;