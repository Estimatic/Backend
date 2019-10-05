const mongoose = require("mongoose");

const category = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "company",
    default: null
  }
});

const Category = mongoose.model("category", category);
module.exports = Category;
