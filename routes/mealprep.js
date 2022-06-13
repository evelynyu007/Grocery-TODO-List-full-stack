const express = require("express");
const router = express.Router();
const mealprepCtrl = require("../controllers/mealprep.js");

// /grocery_list
router.get("/", mealprepCtrl.index);
router.get("/new", mealprepCtrl.new);
router.get("/:id", mealprepCtrl.show);
router.post("/", mealprepCtrl.create);
// here is post not delete ?!
router.post("/:id", mealprepCtrl.deleteIt);

module.exports = router;
