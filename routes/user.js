const express = require("express");
const router = express.Router();
const path = require("path");
const api = require("../api/main");
const mongoose = require("mongoose");
const categoryModel = require("../api/models/categoryModel");

//User model//
const User = require("../api/models/userModel");

// Register page
router.get("/signup", (req, res) => {
  api
    .getFromDB(categoryModel, {}, "displayName nameInDoc -_id", {
      lean: true
    })
    .then(categoriesDB => {
      res.render("index", {
        title: "Sign up",
        partial: "signup",
        categories: categoriesDB
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
