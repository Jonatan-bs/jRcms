const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const api = require("../api/helper");
const addCustomCategory = require("../api/addCustomCat.js");

//Category models//
const models = require("../api/models/customCategoryModels");

// add document to category
router.post("/add/:category", (req, res, next) => {
  prefix = "jr_";
  let category = prefix + req.params.category;
  category = models[category];

  if (category) {
    api.addToDB(req, res, category.model);
  } else {
    next();
  }
});

// add new category
router.post("/add/category", (req, res, next) => {
  addCustomCategory(req, res, next);
});
module.exports = router;
