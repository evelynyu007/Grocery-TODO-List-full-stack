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
  deleteIt,
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
async function create(req, res) {
  // handle the name with spaces - not now
  requestURL = `https://spoonacular.com/cdn/ingredients_100x100/${req.body.name}.jpg`;

  await IngredientModel.create(req.body, async function (err, ingredients) {
    // at this moment, apple is created
    await IngredientModel.updateOne(
      { name: req.body.name },
      { imgURL: requestURL }
    );
    res.redirect("/ingredients/new");
  });
}

// GET
async function newIngredient(req, res) {
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

  // fetch API
  const params = {
    api_key: process.env.USDA_API_KEY,
    query: req.body.name, //need to get ingredients name
    dataType: ["Survey (FNDDS)"],
    pagesize: 1,
  };
  const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(
    params.api_key
  )}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(
    params.dataType
  )}&pageSize=${encodeURIComponent(params.pagesize)}`;

  // find the ingredient(object) and update the nutrients array
  // const ingredient = await IngredientModel.findById(id);

  // in case api cannot find
  try {
    const response = await fetch(api_url);
    const dataFood = await response.json();
    const dataDesc = dataFood.foods[0].description;
    const dataNutrients = dataFood.foods[0].foodNutrients;
    // if found then overwrite
    // https://mongoosejs.com/docs/documents.html
    // await ingredient.overwrite({ nutrition: dataNutrients }); //this not works
    await IngredientModel.updateOne(
      { _id: id },
      { nutrition: dataNutrients, description: dataDesc }
    );
  } catch (error) {
    console.log(error);
  }

  // after used IngredientModel to update, ingredient.nutrition=[]
  // console.log("length: " + ingredient.nutrition.length); //this was correct
  res.redirect(`/ingredients/${id}`);
  ///save
  // ingredient.save(function (err) {
  //   res.redirect(`/ingredients/${id}`);
  // });
}

function deleteIt(req, res) {
  const id = req.params.id;
  IngredientModel.findByIdAndRemove(id)
    .then(() => {
      // redirect to the page after deleting
      res.redirect("/ingredients/new");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
}
