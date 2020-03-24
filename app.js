const createError = require("http-errors");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const express = require("express"); // Håndtering af server
const logger = require("morgan"); // module for logging
const adminRouter = require("./routes/adminRouter"); // Routing
const bodyParser = require("body-parser");

var app = express();

// App temporary cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Set routing for static files
app.use("/admin", express.static(path.join(__dirname, "admin")));
//app.use(express.static(path.join(__dirname, "public")));

// Mount routes
app.use("/admin", adminRouter); // mount routes for views

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
  .catch(error => handleError("error connecting to database"));

module.exports = app;
