const express = require("express");
const router = express.Router();
const mealprepCtrl = require("../controllers/mealprep.js");

// /grocery_list
router.get("/", mealprepCtrl.index);
router.get("/new", mealprepCtrl.new);
router.post("/", mealprepCtrl.create);

module.exports = router;
