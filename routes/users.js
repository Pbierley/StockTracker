// express
const express = require("express");
const router = express.Router();
const { findUser, signupUser } = require("../controllers/userController");

//  imports
router.post("/login", findUser);
router.post("/signup", signupUser);

module.exports = router;
