const express = require("express");
const mysql = require("mysql2");
const Sequelize = require("sequelize");
const cors = require("cors");

const sequelize = new Sequelize(
  "defaultdb",
  "avnadmin",
  "AVNS_ZcJcUB5mhTBQrpO2bCy",
  {
    dialect: "mysql",
    host: "mysql-24d8e3fd-project-bf98.a.aivencloud.com",
    port: "17777",
  }
);

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  mobilenumber: {
    type: Sequelize.STRING,
  },
  otp: {
    type: Sequelize.STRING,
    unique: true,
  },
});

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());

const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIAY5PV4H3X7C7MC4Y5",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const sns = new AWS.SNS();

const topicParams = {
  Name: "OTPMessage",
};

sns.createTopic(topicParams, (err, data) => {
  if (err) {
    console.error("Error creating topic:", err);
  } else {
    console.log("Topic ARN:", data.TopicArn);
  }
});

const subscribeParams = {
  Protocol: "sms",
  TopicArn: "arn:aws:sns:ap-south-1:613085363951:OTPMessage",
  Endpoint: "+917867972157",
};

const sendOTP = async (number) => {
  sns.subscribe(subscribeParams, async (err, data) => {
    if (err) {
      console.error("Error subscribing mobile number:", err);
    } else {
      console.log("Subscribed mobile number:", data.SubscriptionArn);
      const messageParams = {
        Message: number,
        PhoneNumber: "+917867972157",
      };

      sns.publish(messageParams, async (publishErr, publishData) => {
        if (publishErr) {
          console.error(
            "Error sending SMS to India mobile number:",
            publishErr
          );
        } else {
          console.log(
            "SMS sent to India mobile number:",
            publishData.MessageId
          );
          try {
            const newUser = await User.create({
              mobilenumber: "9585294282",
              otp: number,
            });

            if (newUser instanceof User) {
              console.log("New user created:", newUser.toJSON());
            } else {
              console.log("User creation failed");
            }
          } catch (error) {
            console.error("Error creating user:", error);
          }
        }
      });
    }
  });
};

sequelize
  .authenticate()
  .then(() => {
    console.log("syced");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/send-otp", (req, res) => {
  sendOTP(Math.floor(1000 + Math.random() * 9000).toString());
  res.status(200).send("Success");
});

app.post("/api/post", (req, res) => {
  // Access the data from the request body
  const requestData = req.body;
  console.log(requestData);
  // Perform any processing with the data
  // For now, just send it back as a response
  res.json({ message: "Data received successfully", data: requestData });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Service URI
// mysql://CLICK_TO:REVEAL_PASSWORD@mysql-24d8e3fd-project-bf98.a.aivencloud.com:17777/defaultdb?ssl-mode=REQUIRED
