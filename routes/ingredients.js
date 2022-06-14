const express = require("express");
const router = express.Router();
const ingredientsCtrl = require("../controllers/ingredients.js");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get("/ingredients/new", ingredientsCtrl.new);
router.post("/ingredients", ingredientsCtrl.create);
router.get("/ingredients/:id", ingredientsCtrl.show);
router.post("/ingredients/:id", urlencodedParser, ingredientsCtrl.createAPI);

module.exports = router;
