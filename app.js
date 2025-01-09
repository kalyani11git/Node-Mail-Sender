const http = require("http");
const nodemailer = require("nodemailer");
const express = require("express");
require("dotenv").config(); // Load environment variables

const app = express();

app.get("/", (req, res) => {
  const auth = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465,
    auth: {
      user: process.env.SENDER_MAIL_ID,
      pass: process.env.SENDER_PASSWORD,
    },
  });

  const receiver = {
    from: process.env.SENDER_MAIL_ID,
    to: process.env.RECEIVER_MAIL_ID,
    subject: "Node.js Mail Testing!",
    text: "Hello, this is a test email!",
  };

  auth.sendMail(receiver, (error, emailResponse) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).send("Error sending email");
      return;
    }
    console.log("Email sent successfully!");
    res.send("Email sent successfully!");
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
