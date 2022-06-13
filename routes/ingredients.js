const express = require("express");
const router = express.Router();
const ingredientsCtrl = require("../controllers/ingredients.js");

router.get("/ingredients/new", ingredientsCtrl.new);
router.post("/ingredients", ingredientsCtrl.create);

router.post("/mealprep/:id/ingredients", ingredientsCtrl.addToIngredient);

module.exports = router;
