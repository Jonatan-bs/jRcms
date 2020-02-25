const categoryModel = require("../../models/categoryModel");
const User = require("../../models/userModel");
const mongoose = require("mongoose");
const initCatModels = require("../../models/customCatModels");

controller = {
  getPage(req, res, next) {
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
      .catch(err => next());
  },
  addDocument: (req, res, next) => {
    let category = req.params.category;

    initCatModels()
      .then(() => {
        model = mongoose.models[category];
        return new model({
          _id: new mongoose.Types.ObjectId(),
          ...req.body
        });
      })
      .then(newDocument => {
        return newDocument.save();
      })
      .then(savedDocument => {
        res.status("201").json({
          message: "Document created",
          createdDocument: savedDocument
        });
      })
      .catch(err => {
        console.log(err);
        res.status("500").json({ error: err });
      });
  },
  addDocumentPage: (req, res, next) => {
    prefix = "jr_";
    let categoryName = prefix + req.params.category;
    let categoriesObj;

    initCatModels(req, res, next)
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
  }
};
module.exports = controller;
