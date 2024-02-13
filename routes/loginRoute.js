const express = require("express");

const router = express.Router();

const loginController = require("../controllers/loginController");

router.post("/send-otp", loginController.sendOTP);

router.post("/verify-otp", loginController.verifyOtp);

module.exports = router;
