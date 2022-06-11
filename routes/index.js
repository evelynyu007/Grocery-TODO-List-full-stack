const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  // res.redirect("/grocerylist");
  res.render("index", { title: "Grocery List" });
});

module.exports = router;
