const express = require("express");
const router = express.Router();
const api = require("../api/main");
const categoryModel = require("../api/models/categoryModel");

// Register page
router.get("/signup", (req, res) => {
  api
    .getFromDB(categoryModel, {}, "displayName nameInDoc -_id", {
      lean: true
    })
    .then(categoriesDB => {
      res.render("admin/index", {
        title: "Sign up",
        partial: "signup",
        categories: categoriesDB
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
