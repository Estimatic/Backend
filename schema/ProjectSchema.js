const mongoose = require("mongoose");

const project = new mongoose.Schema(
  {
    project_name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    project_status: {
      type: String,
      required: true,
      default: "pre"
    },
    is_estimated: {
      type: Boolean,
      default: false
    },
    due_date: {
      type: Number,
      required: true
    },
    // the customer that this project is related to
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customer",
      required: true
    },
    // the employee assigned to this project
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    // the company which this project is related to.
    company_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true
    }
  },
  { timestamps: true }
);

const Project = mongoose.model("project", project);
module.exports = Project;
