const express = require("express");
// const mysql = require("mysql2");
// const Sequelize = require("sequelize");
const cors = require("cors");
const sequelize = require("./util/database");

const userRoute = require("./routes/loginRoute");

const bodyParser = require("body-parser");

const app = express();
const port = process.env.SERVER_PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(userRoute);

sequelize
  .sync()
  .then(() => {
    console.log("syced");
  })
  .catch((err) => {
    console.log(err);
  });
// app.get("/send-otp", (req, res) => {
//   sendOTP(Math.floor(1000 + Math.random() * 9000).toString());
//   res.status(200).send("Success");
// });

// app.post("/api/post", (req, res) => {
//   // Access the data from the request body
//   const requestData = req.body;
//   console.log(requestData);
//   // Perform any processing with the data
//   // For now, just send it back as a response
//   res.json({ message: "Data received successfully", data: requestData });
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Service URI
// mysql://CLICK_TO:REVEAL_PASSWORD@mysql-24d8e3fd-project-bf98.a.aivencloud.com:17777/defaultdb?ssl-mode=REQUIRED
