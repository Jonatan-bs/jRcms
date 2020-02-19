const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//Custom categories with model//
const getCategories = require("../api/models/customCatModels");

// Get all from category
router.get("/:category", (req, res, next) => {
  prefix = "jr_";
  let category = prefix + req.params.category;
  getCategories.then(categories => {
    category = categories[category];
    if (category) {
      const model = category.model;
      // show all documents from collection
      model
        .find({}, "-__v", { lean: true }, (err, documents) => {
          if (err) console.log(err);
          // Render page
          res.render("index", {
            nameInDoc: req.params.category,
            title: category.displayName,
            partial: "category",
            documents: documents,
            rewrite: category.rewriteObj
          });
        })
        .then()
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
});

// Add new document
router.get("/:category/add", (req, res, next) => {
  prefix = "jr_";
  let category = prefix + req.params.category;
  getCategories.then(categories => {
    category = categories[category];

    if (category) {
      res.render("index", {
        nameInDoc: req.params.category,
        title: category.displayName,
        partial: "newDocument",
        category: category,
        fields: category.collections
      });
    } else {
      next();
    }
  });
});

module.exports = router;
