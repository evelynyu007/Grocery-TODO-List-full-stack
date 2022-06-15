const express = require("express");
const router = express.Router();
const ingredientsCtrl = require("../controllers/ingredients.js");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
// cannot access food unless login
// router.use((req, res, next) => {
//   if (req.session.loggedIn) {
//     next();
//     console.log("next is running");
//   } else {
//     res.redirect("/users/login");
//   }
// });

router.get("/ingredients/new", ingredientsCtrl.new);
router.post("/ingredients", ingredientsCtrl.create);
router.get("/ingredients/:id", ingredientsCtrl.show);
router.post("/ingredients/:id", urlencodedParser, ingredientsCtrl.createAPI);
// method override
router.delete("/ingredients/:id", ingredientsCtrl.deleteIt);

module.exports = router;
