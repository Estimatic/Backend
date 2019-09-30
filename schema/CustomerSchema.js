const mongoose = require("mongoose");

const customer = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    // the company which this customer is owned by.
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true
    }
  },
  { timestamps: true }
);

const Customer = mongoose.model("customer", customer);
module.exports = Customer;
