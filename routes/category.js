const express = require("express");
const router = express.Router();
const categoryModel = require("../api/models/categoryModel");
const mongoose = require("mongoose");

//Custom categories with model//
const initCatModels = require("../api/models/customCatModels");

// Get all from custom category
router.get("/:category", (req, res, next) => {
  prefix = "jr_";
  let category = prefix + req.params.category;
  let categories;
  let documents;
  let model;

  initCatModels()
    // Get model from category matching req.params.category
    .then(() => {
      model = mongoose.models[category];
      if (!model) throw new Error("Category doesn't exist!");
      // get all documents from collection
      return model.find({}, "-__v", { lean: true });
    })
    .then(response => {
      documents = response;
      return categoryModel.find({}, "displayName nameInDoc -_id", {
        lean: true
      });
    })
    .then(response => {
      categories = response;
      return categoryModel.findOne(
        { nameInDoc: category },
        "displayName rewriteObj -_id"
      );
    })
    .then(category => {
      res.render("admin/index", {
        nameInDoc: req.params.category,
        title: category.displayName,
        partial: "category",
        documents: documents,
        rewrite: category.rewriteObj,
        categories: categories
      });
    })
    .catch(err => next(err));
});

// Add new document
router.get("/:category/add", (req, res, next) => {
  prefix = "jr_";
  let categoryName = prefix + req.params.category;
  let categoriesObj;

  initCatModels()
    // Get model from category matching req.params.category
    .then(() => {
      return categoryModel.find({}, "-_id", {
        lean: true
      });
    })
    .then(categories => {
      categoriesObj = categories;
      return categoryModel.findOne({ nameInDoc: categoryName }, "-_id", {
        lean: true
      });
    })
    .then(category => {
      console.log(category);

      res.render("admin/index", {
        nameInDoc: category.nameInDoc,
        title: category.nameInDoc,
        partial: "newDocument",
        category: category,
        categories: categoriesObj,
        fields: category.collections
      });
    })
    .catch(err => next(err));
});

module.exports = router;
