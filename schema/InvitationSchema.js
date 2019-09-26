const mongoose = require("mongoose");

// takes more
const invitation = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true
    },
    sender_name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      minlength: 5
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

const Invitation = mongoose.model("invitation", invitation);
module.exports = Invitation;
