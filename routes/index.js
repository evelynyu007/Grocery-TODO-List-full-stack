const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("index", { title: "Grocery List" });
});

router.get("/ingredients", function (req, res) {
  res.redirect("/ingredients/new");
});

module.exports = router;
