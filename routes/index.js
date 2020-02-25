const express = require("express");
const router = express.Router();
const categoryModel = require("../api/models/categoryModel");

// Routes
router.get("/", (req, res, next) => {
  return categoryModel
    .find({}, "displayName nameInDoc -_id", {
      lean: true
    })
    .then(categoriesDB => {
      res.render("admin/index", {
        title: "index",
        partial: "index",
        categories: categoriesDB
      });
    })
    .catch(err => next(err));
});

// Register page
router.get("/newCategory", (req, res) => {
  categoryModel
    .find({}, "displayName nameInDoc -_id", {
      lean: true
    })
    .then(categoriesDB => {
      res.render("admin/index", {
        title: "new category",
        partial: "newCategory",
        categories: categoriesDB
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
