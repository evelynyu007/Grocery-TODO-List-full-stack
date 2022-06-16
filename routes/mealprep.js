const express = require("express");
const router = express.Router();
const mealprepCtrl = require("../controllers/mealprep.js");

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
// cannot access food unless login
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
    console.log("next is running");
  } else {
    res.redirect("/users/signup_login");
  }
});

// /grocery_list
router.get("/", mealprepCtrl.index);
router.get("/new", mealprepCtrl.new);
router.get("/:id", mealprepCtrl.show);
router.post("/", mealprepCtrl.create);
// method override
router.delete("/:id", mealprepCtrl.deleteIt);

module.exports = router;
