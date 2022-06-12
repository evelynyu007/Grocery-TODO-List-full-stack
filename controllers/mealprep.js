const MealprepModel = require("../models/mealprep.js");

module.exports = {
  index,
};

function index(req, res) {
  MealprepModel.find({}, function (err, mealprep) {
    res.render("mealprep/index", {
      title: "All Meal Prep",
      mealprep,
    });
  });
}

// New meal prep
function newMovie(req, res) {
  res.render("mealprep/new", { title: "Add Meal Prep" });
}

function create(req, res) {}
