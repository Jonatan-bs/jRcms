const categoryModel = require("../../models/categoryModel");
const User = require("../../models/userModel");
const mongoose = require("mongoose");
const initCatModels = require("../../models/customCatModels");
const formData = require("./modules/formData");

controller = {
  getPage(req, res, next) {
    prefix = "jr_";
    prefix = "";
    let category = prefix + req.params.category;
    let categories;
    let documents;
    let model;

    initCatModels()
      .then(() => {
        // Get model from category matching req.params.category
        model = mongoose.models[category];
        if (!model) throw new Error("Category doesn't exist!");
        // get all documents from collection
        return model.find({}, "-__v");
      })
      .then(response => {
        documents = response;
        return categoryModel.find({}, "name nameID -_id", {
          lean: true
        });
      })
      .then(response => {
        categories = response;
        return categoryModel.findOne(
          { nameID: category },
          "name rewriteObj -_id"
        );
      })
      .then(category => {
        res.render("admin/index", {
          nameID: req.params.category,
          title: category.name,
          partial: "category",
          documents: documents,
          rewrite: category.rewriteObj,
          categories: categories
        });
      })
      .catch(next);
  },
  addDocument: (req, res, next) => {
    let category = req.params.category;
    // insert image data
    req.files.forEach(file => {
      if (!req.body[file.fieldname]) {
        console.log(mongoose.models[category].categoryObj);
        req.body[file.fieldname] = {
          originalname: file.originalname,
          mimetype: file.mimetype,
          destination: file.destination,
          filename: file.filename,
          size: file.size
        };
      }
    });
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
      .catch(err => res.status("500").json(err));
  },
  addDocumentPage: (req, res, next) => {
    prefix = "jr_";
    prefix = "";
    let categoryName = prefix + req.params.category;
    let categoriesObj;

    initCatModels()
      // Get model from category matching req.params.category
      .then(() => {
        return categoryModel.find({}, "-_id", {
          lean: true
        });
      })
      .then(categories => {
        categoriesObj = categories;
        return categoryModel.findOne({ nameID: categoryName }, "-_id", {
          lean: true
        });
      })
      .then(category => {
        res.render("admin/index", {
          nameID: category.nameID,
          title: category.name,
          partial: "newDocument",
          category: category,
          categories: categoriesObj
        });
      })
      .catch(next);
  }
};
module.exports = controller;
