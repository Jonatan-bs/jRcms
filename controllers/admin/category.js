const categoryModel = require("../../models/categoryModel");
const User = require("../../models/userModel");
const mongoose = require("mongoose");

controller = {
  newCategoryPage: (req, res, next) => {
    categoryModel
      .find({}, "displayName nameInDoc -_id", {
        lean: true
      })
      .then(categoriesDB => {
        res.render("admin/index", {
          title: "new category",
          partial: "newCategory",
          categories: categoriesDB
        });
      })
      .catch(next);
  },
  addCategory: (req, res, next) => {
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
      .catch(err => res.status("500").json(err));
  }
};
module.exports = controller;
