const bcrypt = require("bcryptjs/dist/bcrypt");
const UserModel = require("../models/user.js");

module.exports = {
  indexSignup,
  create,
  indexLogin,
  show,
  logout,
};

// GET
function indexSignup(req, res) {
  res.render("users/signup", { title: "Sign Up Here" });
}

// POST
async function create(req, res) {
  // encrypt password
  // genSalt - generate a random 10 characters string
  req.body.password = await bcrypt.hash(
    req.body.password,
    await bcrypt.genSalt(10)
  );
  // create user model
  UserModel.create(req.body)
    .then((user) => {
      res.redirect("/users/login");
    })
    .catch((err) => {
      console.log(err);
      res.json({ err });
    });
}

// GET
function indexLogin(req, res) {
  res.render("users/login", { title: "Please Login Here" });
}

// POST
async function show(req, res) {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    // if found the user
    if (user) {
      try {
        const result = await bcrypt.compare(password, user.password);
        // if password is correct
        if (result) {
          // ! store some properties in the session object
          req.session.username = username;
          req.session.loggedIn = true;
          console.log(req.session);
          // redirect to meal page if successful
          res.redirect("/mealprep");
        } else {
          // res.json({ error: "🌚 Password doesn't match! 🌚" });
          res.render("error", {
            message: "?????",
            error: "🌚 Password doesn't match! 🌚",
          });
        }
      } catch (err) {
        res.json({ message: err.message });
      }
    } else {
      // res.json({ error: " User doesn't exist! Did you signup? " });
      res.render("error", {
        message: "Did you signup?????",
        error: "User doesn't exist!!!!!",
      });
    }
  } catch (err) {
    res.json({ meesage: err.meesage });
  }
}

function logout(req, res) {
  // destroy session and redirect to main page
  req.session.destroy((err) => {
    res.redirect("/");
  });
}
