/*========================================
        import dependecies
========================================*/

const MealprepModel = require("../models/mealprep.js");
const IngredientModel = require("../models/ingredient.js");
const fetch = require("node-fetch"); /// NOTE: downgrade
require("dotenv").config();

module.exports = {
  new: newIngredient,
  show,
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

async function show(req, res) {
  const params = {
    api_key: "nNW70iQZe3o7p7bCCSrrasvQAt6i2g7rtb0Cz7xs",
    query: "egg",
    dataType: ["Survey (FNDDS)"],
    pagesize: 3,
  };

  const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(
    params.api_key
  )}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(
    params.dataType
  )}&pageSize=${encodeURIComponent(params.pagesize)}`;
  // can async function inside async function??? or should I move it out
  async function getData() {
    const response = await fetch(api_url);
    return await response.json();
  }
  // take a look at data
  getData().then((data) => console.log(data.foods));

  const dataIngredient = await IngredientModel.findById(req.params.id)

    .then((ingredient) => {
      res.render("ingredients/show", {
        title: "Ingredient Detail",
        ingredient,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ err });
    });
}

// function show(req, res) {
//   // find same id in ingredients id
//   IngredientMode.findById(req.params.id)

//   MealprepModel.find({
//     ingredients: { $in: [req.params.id] },
//   })

//     .populate("dataMeal")
//     .then((dataMeal) => {
//       res.render("ingredients/show", {
//         title: "Ingredient Detail",
//         ingredient,
//         dataMeal,
//       });
//     })
//     // send error as json
//     .catch((error) => {
//       console.log(error);
//       res.json({ error });
//     });
// }
