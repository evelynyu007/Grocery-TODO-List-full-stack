////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express");
const UserModel = require("../models/user");
const bcrypt = require("bcryptjs");
const userCtrl = require("../controllers/user.js");

/////////////////////////////////////////
// Create Route
/////////////////////////////////////////
const router = express.Router();

/////////////////////////////////////////
// Routes
/////////////////////////////////////////

// The Signup Routes (Get => form, post => submit form)
router.get("/signup", userCtrl.indexSignup);
router.post("/signup", userCtrl.create);

// The login Routes (Get => form, post => submit form)
router.get("/login", userCtrl.indexLogin);
router.post("/login", userCtrl.show);

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
