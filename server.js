const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

//Middleware

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/views/index.html");
});

app.post("/", (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // user: process.env.EMAIL,
      user='narvaszach@gmail.com',
      pass='tanginathis'
//  pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: req.body.email,
    to: "zacknarvas@gmail.com",
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send("error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("success");
    }
  });
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log("Server is listening to port");
});
