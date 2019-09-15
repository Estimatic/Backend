const mongoose = require("mongoose");

// takes more
const user = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: String,
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      default: null
    }
  },
  { timestamps: true }
);

const User = mongoose.model("user", user);
module.exports = User;
