const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealprepSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    min: 0,
  },
  /// ref -  tells Mongoose which model to use during population,
  ingredients: [{ type: Schema.Types.ObjectId, ref: "IngredientModel" }],
  prep_time: {
    type: Number,
    min: 0,
  },
  imgURL: String,
  starRating: String,
});
// MealprepModel - is the singular name of the collection your model is for
// Mongoose automatically looks for the plural, lowercased version of your model name
// when use mongoose.model() - will use the default mongoose connection
module.exports = mongoose.model("MealprepModel", mealprepSchema);
