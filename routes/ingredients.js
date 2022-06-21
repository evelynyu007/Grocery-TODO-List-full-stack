const express = require("express");
const router = express.Router();
const ingredientsCtrl = require("../controllers/ingredients.js");
// no Need
// const bodyParser = require("body-parser");
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
// cannot access ingredient unless login
// BUG: why run this first???

// router.use((req, res, next) => {
//   console.log("is this running");
//   console.log(req.session.loggedIn);
//   if (req.session.loggedIn) {
//     next();
//     console.log("next is running");
//   } else {
//     res.redirect("/users/signup_login");
//   }
// });

router.get("/ingredient/new", ingredientsCtrl.new);
router.post("/ingredient", ingredientsCtrl.create); //this one didn't use body parser?

router.get("/ingredient/:id", ingredientsCtrl.show);
// router.post("/ingredient/:id", urlencodedParser, ingredientsCtrl.createAPI);
router.post("/ingredient/:id", ingredientsCtrl.createAPI); // works too, without body parser middleware
// method override
router.delete("/ingredient/:id", ingredientsCtrl.deleteIt);

// middleware authentification
// function auth(req, res, next) {
//   console.log(req.body);
//   if (req.query.name === "admin") {
//     next();
//   } else {
//     res.send("No auth");
//   }
// }

module.exports = router;
