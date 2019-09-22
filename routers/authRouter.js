const express = require("express");
const router = express.Router();
const User = require("../schema/userSchema.js");
const bcrypt = require("bcrypt");

// const jwt = require("jsonwebtoken");
// const secret = require("../../server/secrets.js").jwtSecret;

router.post("/register", async (req, res) => {
  console.log(req.body);
  const { full_name, email, password, company_id } = req.body;

  if (full_name && email && password && company_id) {
    hashedPassword = bcrypt.hashSync(password, 8);
    if (company_id) {
      // if a company id is present, user type is automaticall set to 1
      try {
        const newUser = await User.create({
          full_name,
          password: hashedPassword,
          email,
          company_id
        });

        res.status(201).json({
          message: "We've added this user to your company",
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

// router.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   db("users")
//     .where({ username })
//     .first()
//     .then(user => {
//       if (bcrypt.compareSync(password, user.password)) {
//         const token = generateToken(user);
//         res.status(200).json({
//           message: "welcome back!",
//           token
//         });
//       } else {
//         res.status(401).json({ message: "invalid credentials" });
//       }
//     })
//     .catch(err => res.status(500).json({ errMessage: "unable to login" }));
// });

// function generateToken(user) {
//   const payload = {
//     subject: user.id,
//     username: user.username,
//     department: user.department
//   };
//   const options = {
//     expiresIn: "1h"
//   };

//   return jwt.sign(payload, secret, options);
// }

module.exports = router;
