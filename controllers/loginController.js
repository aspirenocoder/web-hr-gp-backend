// const UserData = require("../models/dataModel");

// const Heading = require("../models/heading");

// const Subheading = require("../models/subheading");

// const Feedback = require("../models/feedback");

// require("dotenv").config();

const User = require("../models/userModel");

const sendOtp = require("../util/sns");
const runWhatsappFun = require("../util/whatsapp");


exports.sendOTP = async (req, res) => {
  try {
    const { number } = req.body;
    console.log(number);
    console.log(req.body);

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    await sendOtp(number, otp);
    await runWhatsappFun(otp, number);
    const createOtp = await User.create({ otp, mobilenumber: number });
    res.status(200).json({
      message: `otp sent succesfully to this mobile number ${number}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { number, userEnteredOtp } = req.body;
  const verifyOtp = await User.findOne({
    where: { mobilenumber: number, otp: userEnteredOtp },
  });
  if (!verifyOtp) {
    res.status(404).json({ message: "otp doesn't match" });
  }
  res.status(200).json({ message: "otp verified succesfully" });
};
