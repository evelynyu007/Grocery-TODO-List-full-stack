/*========================================
        import dependecies
========================================*/

const MealprepModel = require("../models/mealprep.js");
const IngredientModel = require("../models/ingredient.js");
const express = require("express"); /// Need it??
const fetch = require("node-fetch"); /// NOTE: downgrade
require("dotenv").config();

module.exports = {
  new: newIngredient,
  show,
  create,
  createAPI,
};

/// NOT ADD Ingredient from meal pages
// function addToIngredient(req, res) {
//   MealprepModel.findById(req.params.id, function (err, mealprep) {
//     mealprep.ingredients.push(req.body.ingredientId); // ingredientID from show.ejs
//     mealprep.save(function (err) {
//       res.redirect(`/mealprep/${mealprep._id}`);
//     });
//   });
// }

// POST
function create(req, res) {
  IngredientModel.create(req.body, function (err, ingredients) {
    res.redirect("/ingredients/new");
  });
}

// GET
function newIngredient(req, res) {
  IngredientModel.find({}, function (err, ingredients) {
    res.render("ingredients/new", {
      title: "Add Ingredient",
      ingredients,
    });
  });
}

// GET
async function show(req, res) {
  // find same id in ingredients id
  const dataMeal = await MealprepModel.find({
    ingredients: { $in: [req.params.id] },
  });

  const ingredient = await IngredientModel.findById(req.params.id);

  res.render("ingredients/show", {
    title: "Ingredient Detail",
    dataMeal,
    ingredient,
  });
}

// POST for API
async function createAPI(req, res) {
  console.log(req.body.name);
  console.log(req.body.id);
  console.log("is this working???");
  const id = req.body.id;
  // api data save into ingredients
  const ingredient = await IngredientModel.findById(id);
  // issue: mulitple pushed...
  ingredient.nutrition.push({ content: "test" }); // successfully pushed
  console.log(ingredient);
  ingredient.save(function (err) {
    res.redirect(`/ingredients/${id}`);
  });
}
