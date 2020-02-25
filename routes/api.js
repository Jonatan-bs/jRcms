const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const api = require("../api/main");
const multer = require("multer"); // Handle file uploads
const upload = multer({ dest: "admin/uploads/" }); // Handle file uploads

//const addCustomCategory = require("../api/addCustomCat.js");
const User = require("../api/models/userModel");
const initCatModels = require("../api/models/customCatModels");
const categoryModel = require("../api/models/categoryModel");

// add new category
router.post("/add/category", (req, res, next) => {
  api
    .addToDB(req, res, categoryModel)
    .then(response => {
      initCatModels(true);
      return response;
    })
    .then(response => {
      console.log(response);
      res.status("201").json(response);
    })
    .catch(err => next(err));
});

// add user
router.post("/add/user", (req, res) => {
  api
    .addToDB(req, res, User)
    .then(response => {
      console.log(response);
      res.status("201").json(response);
    })
    .catch(err => next(err));
});

// add document to category
router.post("/add/:category", (req, res, next) => {
  let category = req.params.category;
  initCatModels()
    .then(() => {
      model = mongoose.models[category];
      return api.addToDB(req, res, model);
    })
    .then(response => {
      console.log(response);
      res.status("201").json(response);
    })
    .catch(err => next(err));
});

module.exports = router;
