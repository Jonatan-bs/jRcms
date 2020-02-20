const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const api = require("../api/post");
//const addCustomCategory = require("../api/addCustomCat.js");
const User = require("../api/models/userModel");
const getCategories = require("../api/models/customCatModels");
const Category = require("../api/models/categoryModel");

// add new category
router.post("/add/category", (req, res, next) => {
  api.addToDB(req, res, Category);
});

// add document to category
router.post("/add/:category", (req, res, next) => {
  prefix = "jr_";
  let category = prefix + req.params.category;
  getCategories.then(categories => {
    category = categories[category];
    api.addToDB(req, res, category.model);
  });
});

// add user
router.post("/add/user", (req, res) => {
  api.addToDB(req, res, User);
});

// Delete users
// router.post("/delete/users", (req, res) => {
//   User.remove({})
//     .then(result => {
//       console.log(result);
//       res.status("200").json({
//         message: "All users were deleted",
//         amount: result.deletedCount
//       });
//     })
//     .catch(err => {
//       console.log(err);
//       res.status("500").json({
//         error: err
//       });
//     });
// });

module.exports = router;
