const MealprepModel = require("../models/mealprep.js");
const IngredientModel = require("../models/ingredient.js");

module.exports = {
  new: newIngredient,
  create,
  addToIngredient,
};

function addToIngredient(req, res) {
  MealprepModel.findById(req.params.id, function (err, mealprep) {
    mealprep.ingredients.push(req.body.ingredientId); // ingredientID from show.ejs
    mealprep.save(function (err) {
      res.redirect(`/mealprep/${mealprep._id}`);
    });
  });
}

function create(req, res) {
  IngredientModel.create(req.body, function (err, ingredients) {
    res.redirect("/ingredients/new");
  });
}

function newIngredient(req, res) {
  IngredientModel.find({}, function (err, ingredients) {
    res.render("ingredients/new", {
      title: "Add Ingredient",
      ingredients,
    });
  });
}
