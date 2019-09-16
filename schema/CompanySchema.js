const mongoose = require("mongoose");

const company = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    // the person who created this company will be the default
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null
    },
    logo_url: {
      type: String,
      default: null
    }
  },
  { timestamps: true }
);

const Company = mongoose.model("company", company);
module.exports = Company;
