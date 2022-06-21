const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  mealprep: [{ type: Schema.Types.ObjectId, ref: "MealprepModel" }],
  description: String, /// from API
  nutrition: [], /// store object
  imgURL: String, // from API

  //username: String, // use String to store username
});

module.exports = mongoose.model("IngredientModel", ingredientSchema);
