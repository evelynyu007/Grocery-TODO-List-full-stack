const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/mealprep");
  // res.render("index", { title: "Grocery List" });
});

router.get("/ingredients", function (req, res) {
  res.redirect("/ingredients/new");
  // res.render("index", { title: "Grocery List" });
});

module.exports = router;
