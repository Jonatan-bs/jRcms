const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Custom categories with model//
const categories = require("../api/models/customCategoryModels");

// Get all from category
router.get("/:category", (req, res, next) => {
  const category = categories[req.params.category];

  if (category) {
    const model = category.model;
    // show all documents from collection
    model
      .find({})
      .then(collection => {
        console.log(collection);
        //res.status("200").json({ result });
        // Render page
        res.render("index", {
          title: category.name,
          partial: "category",
          category: "",
          collection: collection
        });
      })
      .catch(err => {
        console.log(err);
        res.status("500").json({
          error: err
        });
      });
  } else {
    next();
  }
});

module.exports = router;
