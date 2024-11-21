const express = require("express");
const AuthService = require("../services/authService"); // auth service
const router = express.Router();

router.post("/login", AuthService.login); // login is defined
router.post("/signup", AuthService.signup); // signup is defined

module.exports = router;
