const categoryModel = require("../../models/categoryModel");
const mongoose = require("mongoose");
const formData = require("./modules/formData");
const initCatModels = require("../../models/customCatModels");

controller = {
  addCategoryPage: (req, res, next) => {
    categoryModel
      .find({}, "name nameID -_id", {
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
  categoriesPage: (req, res, next) => {
    categoryModel
      .find({}, "name nameID -_id", {
        lean: true
      })
      .then(categoriesDB => {
        res.render("admin/index", {
          title: "categories",
          partial: "categories",
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

    req.body.contentType = {};
    req.body.fields.forEach(field => {
      req.body.contentType[field.nameID] = field.contentType;
    });

    const newDocument = new categoryModel({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    newDocument
      .save()
      .then(() => {
        initCatModels(true);
        res.status("201").json({
          message: "Document created",
          createdDocument: newDocument
        });
      })
      .catch(err => res.status("500").json(err));
  }
};
module.exports = controller;
