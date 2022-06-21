/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const createError = require("http-errors");
const express = require("express");
// const morgan = require("morgan"); //HTTP request logger middleware for node js
const logger = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Load the "secrets" in the .env file
require("dotenv").config();
// Connect to the MongoDB database
require("./config/database");

const indexRouter = require("./routes/index");
const mealprepRouter = require("./routes/mealprep");
const ingredientRouter = require("./routes/ingredients");
const userRouter = require("./routes/user");

// express app
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*========================================
        Middleware
========================================*/
app.use(logger("dev"));
//app.use(morgan("tiny")); //logging
app.use(express.json());
// to tell express to use the middleware??
app.use(express.urlencoded({ extended: true })); ///false ??????????????????????
// TODO:  difference from body-parser??
app.use(cookieParser());
// serve files from public statically
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method")); // override for put and delete requests from forms

app.use(
  session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    saveUnintialized: true,
    resave: false,
  })
);

/*========================================
        Routes
========================================*/
// no shi.. put next(creatError(404)) here will get crushed...
// app.use(function (req, res, next) {
//   next(); // without createError(404) then works!...
// });

app.use("/", indexRouter);
app.use("/mealprep", mealprepRouter);
app.use("/", ingredientRouter);
app.use("/users", userRouter);

// no shi.. the following cannot before app.use()
// catch 404 and forward to error handler & middleware
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
