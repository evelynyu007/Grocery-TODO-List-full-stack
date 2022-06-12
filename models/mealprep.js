const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mealprepSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: Number,
  ingredients: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  prep_time: Number,
  imgURL: String,
  starRating: String,
});

module.exports = mongoose.model("MealprepModel", mealprepSchema);
