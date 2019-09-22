const mongoose = require("mongoose");

// takes more
const user = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    company_id: {
      // the company which this user belongs to
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      default: null
    }
  },
  { timestamps: true }
);

const User = mongoose.model("user", user);
module.exports = User;
