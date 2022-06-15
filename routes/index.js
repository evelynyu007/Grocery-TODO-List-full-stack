const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("index", { title: "Grocery List" });
});

router.get("/ingredients", function (req, res) {
  res.redirect("/ingredients/new");
});

// if already logged in, then cannot logged in / sign up again
router.get("/users/signup", function (req, res) {
  if (req.session.loggedIn) {
    res.redirect("/mealprep");
  } else {
    res.render("users/signup");
  }
});

router.get("/users/login", function (req, res) {
  if (req.session.loggedIn) {
    res.redirect("/mealprep");
  } else {
    res.render("users/login");
  }
});

module.exports = router;
