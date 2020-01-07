const mongoose = require("mongoose");

const project = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    projectStatus: {
      type: String,
      required: true,
      default: "pre"
    },
    isEstimated: {
      type: Boolean,
      default: false
    },
    dueDate: {
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
    assignedTo: {
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
