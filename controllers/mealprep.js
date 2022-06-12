const MealprepModel = require("../models/mealprep.js");
const IngredientModel = require("../models/ingredient.js");

module.exports = {
  index,
  show,
  new: newMeal,
  create,
};

function index(req, res) {
  MealprepModel.find({}, function (err, mealprep) {
    res.render("mealprep/index", {
      title: "All Meal Prep",
      mealprep,
    });
  });
}

// show each meal prep details, including ingredients
function show(req, res) {
  MealprepModel.findById(req.params.id)
    .populate("ingredients")
    .exec(function (err, mealprep) {
      IngredientModel.find(
        { _id: { $nin: mealprep.ingredients } },
        function (err, ingredients) {
          console.log(ingredients);
          res.redener("mealprep/show", {
            title: "Meal Prep Detail",
            mealprep,
            ingredients,
          });
        }
      );
    });
}

// New meal prep
function newMeal(req, res) {
  res.render("mealprep/new", { title: "Add Meal Prep" });
}

function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  const mealprep = new MealprepModel(req.body);

  // with save(), you get full validation & middleware
  mealprep.save(function (err) {
    if (err) return res.redirect("/mealprep/new");
    console.log("new meal prep created");
    res.redirect(`/mealprep/${mealprep._id}`);
  });
}
