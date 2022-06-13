const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  nutrition: String, /// will be API
  // mealpreps: [{ type: Schema.Types.ObjectId, ref: "Mealprep" }],
});

module.exports = mongoose.model("IngredientModel", ingredientSchema);
