const MealprepModel = require("../models/mealprep.js");
const IngredientModel = require("../models/ingredient.js");

module.exports = {
  index,
  show,
  new: newMeal,
  create,
  deleteIt,
};

function index(req, res) {
  MealprepModel.find({ username: req.session.username })
    .then((mealprep) => {
      res.render("mealprep/index", {
        title: "All Meal Prep",
        mealprep,
      });
    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
}

// show each meal prep details, including ingredients
// ??? I don't need $nin right???
function show(req, res) {
  MealprepModel.findById(req.params.id)
    .populate("ingredients")
    .exec(function (err, mealprep) {
      IngredientModel.find(
        { _id: { $nin: mealprep.ingredients } },
        function (err, ingredients) {
          // console.log(ingredients);
          res.render("mealprep/show", {
            title: "Meal Prep Detail",
            mealprep,
            ingredients,
          });
        }
      );
    });
}

// New meal prep
// function newMeal(req, res) {
//   res.render("mealprep/new", { title: "Add Meal Prep"});
// }

async function newMeal(req, res) {
  console.log(IngredientModel);
  const dataIngredients = await IngredientModel.find({}); // should be object
  // console.log(dataIngredients); // object data
  res.render("mealprep/new", { title: "Add Meal Prep", dataIngredients });
}
////////////////////////////////
// POST create route
////////////////////////////////
function create(req, res) {
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  // need to store req.body.username
  req.body.username = req.session.username;
  console.log(req.body); // object, each ingredient is a variables now

  // create mealprep model
  const mealprep = new MealprepModel(req.body);

  // with save(), you get full validation & middleware
  mealprep.save(function (err) {
    if (err) return res.redirect("/mealprep/new");
    console.log("new meal prep created");
    res.redirect(`/mealprep/${mealprep._id}`);
  });
}

// Delete
function deleteIt(req, res) {
  const id = req.params.id;
  MealprepModel.findByIdAndRemove(id)
    .then(() => {
      // redirect to main page after deleting
      res.redirect("/mealprep");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
}

// function deleteIt(req, res) {
//   MealprepModel.find({ id: req.params.id }).remove().exec();
// }
