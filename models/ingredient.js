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
  nutrition: [], /// store object
  // nutrition: { type: Array, default: void 0 }, - cannot use this
});

module.exports = mongoose.model("IngredientModel", ingredientSchema);
