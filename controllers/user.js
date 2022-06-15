const UserModel = require("../models/user.js");

module.exports = {
  indexSignup,
  create,
  indexLogin,
  show,
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
      res.redirect("users/login");
    })
    .catch((err) => {
      console.log(err);
      res.json({ err });
    });
}

// GET
function indexLogin(req, res) {
  res.render("users/login", { title: "Login Here" });
}

// POST
function show(req, res) {}
