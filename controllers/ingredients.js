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

/// use API here?
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

// async function show(req, res) {
//   const params = {
//     api_key: "nNW70iQZe3o7p7bCCSrrasvQAt6i2g7rtb0Cz7xs",
//     query: "egg", //need to get ingredients name
//     dataType: ["Survey (FNDDS)"],
//     pagesize: 3,
//   };

//   const api_url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(
//     params.api_key
//   )}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(
//     params.dataType
//   )}&pageSize=${encodeURIComponent(params.pagesize)}`;
//   // can async function inside async function??? or should I move it out
//   async function getData() {
//     const response = await fetch(api_url);
//     return await response.json();
//   }
//   // take a look at data
//   const food = getData();

// IngredientModel.findById(req.params.id)
//     .then((ingredient) => {
//       res.render("ingredients/show", {
//         title: "Ingredient Detail",
//         ingredient,
//         food
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json({ err });
//     });
// }

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
