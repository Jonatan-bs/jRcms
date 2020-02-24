const express = require("express");
const router = express.Router();
const categoryModel = require("../api/models/categoryModel");
const api = require("../api/main");

//Custom categories with model//
const getCategories = require("../api/models/customCatModels");

// Get all from custom category
router.get("/:category", (req, res, next) => {
  prefix = "jr_";
  let category = prefix + req.params.category;
  getCategories().then(categories => {
    category = categories[category];
    if (category) {
      const model = category.model;
      // show all documents from collection
      model
        .find({}, "-__v", { lean: true }, (err, documents) => {
          if (err) console.log(err);
          // Render page
          api
            .getFromDB(categoryModel, {}, "displayName nameInDoc -_id", {
              lean: true
            })
            .then(categoriesDB => {
              res.render("index", {
                nameInDoc: req.params.category,
                title: category.displayName,
                partial: "category",
                documents: documents,
                rewrite: category.rewriteObj,
                categories: categoriesDB
              });
            })
            .catch(err => console.log(err));
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
  getCategories().then(categories => {
    category = categories[category];

    if (category) {
      api
        .getFromDB(categoryModel, {}, "displayName nameInDoc -_id", {
          lean: true
        })
        .then(categoriesDB => {
          res.render("index", {
            nameInDoc: req.params.category,
            title: category.displayName,
            partial: "newDocument",
            category: category,
            categories: categoriesDB,
            fields: category.collections
          });
        })
        .catch(err => console.log(err));
    } else {
      next();
    }
  });
});

module.exports = router;
