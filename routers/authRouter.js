const express = require("express");
const router = express.Router();
const User = require("../schema/userSchema.js");
const bcrypt = require("bcrypt");
require("dotenv").config();
const sgMail = require("@sendgrid/mail");

const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "pubsecret";

router.post("/register", async (req, res) => {
  const { full_name, email, password, company_id } = req.body;

  if (full_name && email && password && company_id) {
    hashedPassword = bcrypt.hashSync(password, 8);
    if (company_id) {
      try {
        const newUser = await User.create({
          full_name,
          password: hashedPassword,
          email,
          company_id
        });

        res.status(201).json({
          message: "We've created your new user.",
          user: newUser
        });
      } catch (err) {
        res
          .status(500)
          .json({ message: "There was an issue with out servers.", err });
      }
    }
  } else {
    res.status(404).json({ message: "please provide all credentials" });
  }
});

router.post("/sendVerificationEmail", async (req, res) => {
  const { emailTo, emailVerificationNumber } = req.body;
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: `${emailTo}`,
      from: `${process.env.SENDGRID_EMAIL}`,
      subject: "Welcome to Estimatic",
      text: "Here is your email verification code!",
      html: `<strong>Were SO happy to have you!</strong> <p> Below is your 6-digit email verification code. Simply enter this code into the box to continue the sign up process!</p> <h2>${emailVerificationNumber}</h2>`
    };
    await sgMail.send(msg);

    res.status(201).json({ message: "Email verification sent!" });
  } catch (err) {
    res.status(500).json({ message: "There was an error sending your email." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).exec();

    if (bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: "welcome back!",
        user,
        token
      });
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ errMessage: "unable to login" });
  }
});

function generateToken(user) {
  const payload = {
    subject: user._id,
    email: user.email
  };
  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
