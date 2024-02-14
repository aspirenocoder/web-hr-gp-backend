const AWS = require("aws-sdk");
require("dotenv").config();

AWS.config.update({
  accessKeyId: process.env.SNSKey,
  secretAccessKey: process.env.SNSSecret,
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
  TopicArn: process.env.ARN,
  Endpoint: "+917867972157",
};

const sendOTP = async (number, otp) => {
  sns.subscribe(subscribeParams, async (err, data) => {
    if (err) {
      console.error("Error subscribing mobile number:", err);
    } else {
      console.log("Subscribed mobile number:", data.SubscriptionArn);
      const messageParams = {
        Message: `your otp for verification is ${otp}`,
        PhoneNumber: `+91${number}`,
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
          //   try {
          //     const newUser = await User.create({
          //       mobilenumber: "9585294282",
          //       otp: number,
          //     });

          //     if (newUser instanceof User) {
          //       console.log("New user created:", newUser.toJSON());
          //     } else {
          //       console.log("User creation failed");
          //     }
          //   } catch (error) {
          //     console.error("Error creating user:", error);
          //   }
        }
      });
    }
  });
};

module.exports = sendOTP;
