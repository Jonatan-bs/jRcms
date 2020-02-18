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
  if (models[req.params.category]) {
    api.addToDB(req, res, models[req.params.category].model);
  } else {
    next();
  }
});

// add new category
router.post("/add/category", (req, res, next) => {
  addCustomCategory(req, res, next);
});
module.exports = router;
