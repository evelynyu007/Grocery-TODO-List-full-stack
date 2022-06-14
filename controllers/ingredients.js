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
  const id = req.body.id;
  // find the ingredient
  const ingredient = await IngredientModel.findById(id);

  // fetch API
  const params = {
    api_key: "nNW70iQZe3o7p7bCCSrrasvQAt6i2g7rtb0Cz7xs",
    query: req.body.name, //need to get ingredients name
    dataType: ["Survey (FNDDS)"],
    pagesize: 1,
  };
  const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(
    params.api_key
  )}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(
    params.dataType
  )}&pageSize=${encodeURIComponent(params.pagesize)}`;

  const response = await fetch(api_url);
  const dataFood = await response.json();
  const dataNutrients = dataFood.foods[0].foodNutrients;
  // api data save into ingredients
  // issue: mulitple pushed...delete...
  for (let n = 0; n < 2; n++) {
    console.log(dataNutrients[n]);
    ingredient.nutrition.push(dataNutrients[n]); // successfully pushed
  }
  console.log(ingredient);
  ingredient.save(function (err) {
    res.redirect(`/ingredients/${id}`);
  });
}
