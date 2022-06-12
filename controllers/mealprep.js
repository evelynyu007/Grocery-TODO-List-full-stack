const MealprepModel = require("../models/mealprep.js");

module.exports = {
  index,
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

// show each meal prep details
function show(req, res) {
  MealprepModel.findById(req.params.id);
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

  mealprep.save(function (err) {
    if (err) return res.redirect("/mealprep/new");
    console.log("new meal prep created");
    res.redirect(`/mealprep/${mealprep._id}`);
  });
}
