const MealprepModel = require("../models/mealprep.js");
const IngredientModel = require("../models/ingredient.js");

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

// function show(req, res) {
//   IngredientModel.findById(req.params.id)
//     .then((ingredient) => {
//       res.render("ingredients/show", {
//         title: "Ingredient Detail",
//         ingredient,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.json({ err });
//     });
// }

function show(req, res) {
  MealprepModel.find(req.params.id)
    .populate("mealprep")
    .exec(function (err, ingredient) {
      MealprepModel.find(
        { _id: { $nin: ingredient.mealprep } },
        function (err, mealprep) {
          res.render("ingredients/show", {
            title: "Ingredient Detail",
            ingredient,
            mealprep,
          });
        }
      );
    });
}
