const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("index", { title: "Grocery List" });
});

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
// router.get("/users/signup", function (req, res) {
//   if (req.session.loggedIn) {
//     res.redirect("/mealprep");
//   } else {
//     res.render("users/signup", { title: "Please Signup" });
//   }
// });

// router.get("/users/login", function (req, res) {
//   if (req.session.loggedIn) {
//     res.redirect("/mealprep");
//   } else {
//     res.render("users/login", { title: "Please Login" });
//   }
// });

module.exports = router;
