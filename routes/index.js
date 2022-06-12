const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/mealprep");
  // res.render("index", { title: "Grocery List" });
});

module.exports = router;
