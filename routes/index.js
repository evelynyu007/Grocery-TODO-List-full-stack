const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("index", { title: "Grocery List" });
});

// when get /ingredient, jump to /ingredient/new
router.get("/ingredient", function (req, res) {
  res.redirect("/ingredient/new");
});

// if already logged in, then cannot logged in / sign up again
router.get("/users/signup_login", function (req, res) {
  if (req.session.loggedIn) {
    res.redirect("/mealprep");
  } else {
    res.render("users/signup_login", { title: "Please Signup/Login" });
  }
});

module.exports = router;
