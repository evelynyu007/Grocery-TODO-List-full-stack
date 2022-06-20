const express = require("express");
const router = express.Router();
const ingredientsCtrl = require("../controllers/ingredients.js");
// Need
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
router.post("/ingredient", ingredientsCtrl.create); //this one didn't use body parser?

router.get("/ingredient/:id", ingredientsCtrl.show);
// router.post("/ingredient/:id", urlencodedParser, ingredientsCtrl.createAPI);
router.post("/ingredient/:id", ingredientsCtrl.createAPI); // works too, without body parser middleware
// method override
router.delete("/ingredient/:id", ingredientsCtrl.deleteIt);

module.exports = router;
