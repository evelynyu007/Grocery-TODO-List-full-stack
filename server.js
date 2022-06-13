const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");

// Load the "secrets" in the .env file
require("dotenv").config();
// Connect to the MongoDB database
require("./config/database");

const indexRouter = require("./routes/index");
const mealprepRouter = require("./routes/mealprep");
const ingredientRouter = require("./routes/ingredients");

// express app
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views")); //no need to do this??
app.set("view engine", "ejs");

/*========================================
        Middleware
========================================*/
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method")); // override for put and delete requests from forms

/*========================================
        Routes
========================================*/

app.use("/", indexRouter);
app.use("/mealprep", mealprepRouter);
app.use("/", ingredientRouter);

// catch 404 and forward to error handler
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