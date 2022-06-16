const express = require("express");
const router = express.Router();
const ingredientsCtrl = require("../controllers/ingredients.js");
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
// cannot access ingredient unless login
// BUG: keep redirecting...
// router.use((req, res, next) => {
//   if (req.session.loggedIn) {
//     next();
//     console.log("next is running");
//   } else {
//     res.redirect("/users/login");
//   }
// });

router.get("/ingredient/new", ingredientsCtrl.new);
router.post("/ingredient", ingredientsCtrl.create);
router.get("/ingredient/:id", ingredientsCtrl.show);
router.post("/ingredient/:id", urlencodedParser, ingredientsCtrl.createAPI);
// method override
router.delete("/ingredient/:id", ingredientsCtrl.deleteIt);

module.exports = router;
