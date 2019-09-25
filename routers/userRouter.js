const router = require("express").Router();
const User = require("../schema/userSchema.js");

// register and login end points will be present in an authRouter.js file

// get single user by ID
router.get("/single_user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).exec();

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "Sorry, we couldnt find that user."
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "There was an error retrieving this user." });
  }
});

// get all users in a company
router.get("/company/:id", async (req, res) => {
  try {
    const users = await User.find({ company_id: req.params.id }).exec();

    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({
        message: "Sorry, we couldnt find those users."
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "There was an error retrieving this companies users." });
  }
});

// update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false
    }).exec();

    if (user) {
      res.status(201).json(user);
    } else {
      res.status(404).json({
        message: "Sorry, we couldnt find that user."
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "There was an error retrieving this user." });
  }
});

// delete a user by id
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id).exec();

    res.status(201).json({ message: "Successfully deleted user." });
  } catch (e) {
    res
      .status(500)
      .json({ message: "There was an error retrieving this user." });
  }
});

// ****
// ****
// ****
// ****
// uses JWT to retrieve a users info
// ****
// ****
// ****
// ****
router.get("/getWithJwt", async (req, res) => {
  // res.status(201).json(res.locals.token.email);
  const email = res.locals.token.email;
  const user = await User.findOne({ email }).exec();

  res.status(200).json(user);
});

module.exports = router;
