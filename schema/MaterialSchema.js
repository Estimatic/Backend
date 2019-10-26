const mongoose = require("mongoose");

const material = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    quantity: {
      type: Number
    },
    photoUrl: {
      type: String
    },
    grade: {
      type: String
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true
    }
  },
  { timestamps: true }
);

const Material = mongoose.model("material", material);
module.exports = Material;
