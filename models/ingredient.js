const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  nutrition: String, /// will be API
});

module.exports = mongoose.model("IngredientModel", ingredientSchema);
