const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const nutritionSchema = new Schema({
//   content: String,
// });

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  mealprep: [{ type: Schema.Types.ObjectId, ref: "MealprepModel" }],
  // nutrition: [nutritionSchema], /// from API
  nutrition: [],
});

module.exports = mongoose.model("IngredientModel", ingredientSchema);

// object doesn't work
// nutrition: {
//   content: String,
//   protein: String,
// },
