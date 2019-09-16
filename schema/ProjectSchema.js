const mongoose = require("mongoose");

const project = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    // the customer that this project is related to
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true
    },
    // the company which this project is related to.
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true
    }
    /*
     **
     **
     **
    still thinking through the most efficient way to store the actual estimates
     **
     **
     **
     */
  },
  { timestamps: true }
);

const Project = mongoose.model("project", project);
module.exports = Customer;
