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

// POST
// get the ingredient API data and then redirect
async function create(req, res) {
  // handle the name with spaces - not now
  requestURL = `https://spoonacular.com/cdn/ingredients_100x100/${req.body.name}.jpg`;

  await IngredientModel.create(req.body, async function (err, ingredients) {
    // at this moment, apple is created
    await IngredientModel.updateOne(
      { name: req.body.name },
      { imgURL: requestURL }
    );
    res.redirect("/ingredient/new");
    // res.render("/ingredient/new"); // cannot use redener even with body parser
  });
}

// GET
// get all the ingredients data
async function newIngredient(req, res) {
  // console.log("User name: " + IngredientModel.username); //check username? undefined
  IngredientModel.find({}, function (err, ingredients) {
    res.render("ingredient/new", {
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

  res.render("ingredient/show", {
    title: "Ingredient Detail",
    dataMeal,
    ingredient,
  });
}

// POST for nutrition API
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
  res.redirect(`/ingredient/${id}`);
  ///save
  // ingredient.save(function (err) {
  //   res.redirect(`/ingredient/${id}`);
  // });
}

function deleteIt(req, res) {
  const id = req.params.id;
  const username = req.session.username;
  console.log(username);
  if (username === "admin") {
    IngredientModel.findByIdAndRemove(id)
      .then(() => {
        // redirect to the page after deleting
        res.redirect("/ingredient/new");
      })
      // send error as json
      .catch((error) => {
        console.log(error);
        res.json({ error });
      });
  } else {
    res.render("../views/error.ejs", {
      message: "No Auth. Only for Admin.",
      error: "you cannot delete ingredient",
    });
  }
}
