const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const api = require("../api/helper");

//User model//
const models = require("../api/models/customCategories");

// add user
router.post("/add/:type", (req, res, next) => {
  if (models[req.params.type]) {
    console.log(req.body);
    api.addToDB(req, res, models[req.params.type].model);
  } else {
    next();
  }
});

module.exports = router;
