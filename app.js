const createError = require("http-errors");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const express = require("express"); // Håndtering af server
const logger = require("morgan"); // module for logging

// Ruters
const usersRouter = require("./routes/user"); // Routing for user API requests
const viewsRouter = require("./routes/views"); // Routing for main site
const catRouter = require("./routes/category"); // Routing for categories
const apiRouter = require("./routes/api"); // Routing for API requests

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Set routing for static files
app.use("/admin", express.static(path.join(__dirname, "admin")));
app.use(express.static(path.join(__dirname, "public")));

// Mount routes
app.use("/user", usersRouter); // mount routes for users
app.use("/api", apiRouter); // mount routes for API requests
app.use("/category", catRouter); // mount routes for categories
app.use("/", viewsRouter); // mount routes for views

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//connect to database
mongoose
  .connect("mongodb://localhost:27017/jrCMS", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(res => console.log("connected to database"))
  .catch(error => handleError(error));

module.exports = app;
