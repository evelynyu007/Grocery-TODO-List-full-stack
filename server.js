/////////////////////////////////////////////
// Import Our Dependencies
/////////////////////////////////////////////
const createError = require("http-errors");
const express = require("express");
// did i use morgan???
// const morgan = require("morgan"); //HTTP request logger middleware for node js
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
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
app.set("views", path.join(__dirname, "views")); //no need to do this??
app.set("view engine", "ejs");

/*========================================
        Middleware
========================================*/
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); ///false ??????????????????????
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"))); // serve files from public statically
app.use(methodOverride("_method")); // override for put and delete requests from forms
//app.use(morgan("tiny")); //logging
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
app.use("/", indexRouter);
app.use("/mealprep", mealprepRouter);
app.use("/", ingredientRouter);
app.use("/users", userRouter);

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
