const express = require("express"); // Håndtering af server
const logger = require("morgan"); // module for logging
const usersRouter = require("./routes/user"); // Routing for user API requests
const viewsRouter = require("./routes/views"); // Routing for main site
const catRouter = require("./routes/category"); // Routing for categories
const apiRouter = require("./routes/api"); // Routing for API requests

const mongoose = require("mongoose"); // Mongoose for database

//connect to database
mongoose.connect("mongodb://localhost:27017/testSite", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// setup express config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Log http requests
app.use(
  logger(
    "-------------------------\n METHOD: :method URL: :url  STATUS: :status RESPONSETIME: :response-time ms"
  )
);

// Set render engine
app.set("view engine", "ejs");

// Set routing for static public files
app.use(express.static("public"));

// Routes
app.use("/user", usersRouter); // mount routes for users
app.use("/api", apiRouter); // mount routes for API requests
app.use("/category", catRouter); // mount routes for categories
app.use("/", viewsRouter); // mount routes for views

// 404 response
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Catch errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
