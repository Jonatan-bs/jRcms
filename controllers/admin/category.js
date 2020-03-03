const categoryModel = require("../../models/categoryModel");
const mongoose = require("mongoose");
const formData = require("./modules/formData");

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
    req.body.rewriteObj = {};

    req.body.rewriteObj[req.body.nameID] = req.body.name;
    req.body.fields.forEach(field => {
      req.body.rewriteObj[field.nameID] = field.name;
    });

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
