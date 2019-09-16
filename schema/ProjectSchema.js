const mongoose = require("mongoose");

const customer = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      unique: true
    },
    // the company which this customer is owned by.
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      default: null
    }
  },
  { timestamps: true }
);

const Customer = mongoose.model("customer", customer);
module.exports = Customer;
