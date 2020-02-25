const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer"); // Handle file uploads
const upload = multer({ dest: "admin/uploads/" }); // Handle file uploads

//const addCustomCategory = require("../api/addCustomCat.js");
const User = require("../api/models/userModel");
const initCatModels = require("../api/models/customCatModels");
const categoryModel = require("../api/models/categoryModel");

// add new category
router.post("/add/category", (req, res, next) => {
  const newDocument = new categoryModel({
    _id: new mongoose.Types.ObjectId(),
    ...req.body
  });
  newDocument
    .save()
    .then(() => {
      res.status("201").json({
        message: "Document created",
        createdDocument: newDocument
      });
    })
    .catch(err => {
      res.status("500").json({ error: err });
    });
});

// add user
router.post("/add/user", (req, res) => {
  const newDocument = new User({
    _id: new mongoose.Types.ObjectId(),
    ...req.body
  });
  newDocument
    .save()
    .then(() => {
      res.status("201").json({
        message: "Document created",
        createdDocument: newDocument
      });
    })
    .catch(err => {
      res.status("500").json({ error: err });
    });
});

// add document to category
router.post("/add/:category", (req, res, next) => {
  let category = req.params.category;
  initCatModels().then(() => {
    model = mongoose.models[category];
    const newDocument = new model({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    newDocument
      .save()
      .then(() => {
        res.status("201").json({
          message: "Document created",
          createdDocument: newDocument
        });
      })
      .catch(err => {
        res.status("500").json({ error: err });
      });
  });
});

module.exports = router;
