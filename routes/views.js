const express = require("express");
const router = express.Router();
const api = require("../api/main");
const mongoose = require("mongoose");
const categoryModel = require("../api/models/categoryModel");

//const User = require("../api/models/userModel");

// Routes
router.get("/", (req, res) => {
  api
    .getFromDB(categoryModel, {}, "displayName nameInDoc -_id", {
      lean: true
    })
    .then(categoriesDB => {
      res.render("index", {
        title: "index",
        partial: "index",
        categories: categoriesDB
      });
    })
    .catch(err => console.log(err));
});

// Register page
router.get("/newCategory", (req, res) => {
  api
    .getFromDB(categoryModel, {}, "displayName nameInDoc -_id", {
      lean: true
    })
    .then(categoriesDB => {
      res.render("index", {
        title: "new category",
        partial: "newCategory",
        categories: categoriesDB
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
