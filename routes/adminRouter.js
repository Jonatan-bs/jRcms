const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const multer = require("multer"); // Handle file uploads
const upload = multer({ dest: "admin/uploads/" }); // Handle file uploads
const categoryModel = require("../api/models/categoryModel");
const initCatModels = require("../api/models/customCatModels");
const User = require("../api/models/userModel");

router.get("/", (req, res, next) => {
  return categoryModel
    .find({}, "displayName nameInDoc -_id", {
      lean: true
    })
    .then(categoriesDB => {
      res.render("admin/index", {
        title: "index",
        partial: "index",
        categories: categoriesDB
      });
    })
    .catch(err => next());
});

/////////////////
//// CUSTOM CATEGORIES
/////////////////

// Custom category page
router.get("/:category", (req, res, next) => {
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
});

// Add custom category document page
router.get("/:category/add", (req, res, next) => {
  prefix = "jr_";
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
});

// Add custom category document
router.post("/:category/add", (req, res, next) => {
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

/////////////////
//// CATEGORY
/////////////////

// Add category page
router.get("/category", (req, res) => {
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
    .catch(err => next());
});

// Add category
router.post("/category", (req, res, next) => {
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

/////////////////
//// USERS
/////////////////

// Add user page
router.get("/signup", (req, res) => {
  categoryModel
    .find({}, "displayName nameInDoc -_id", {
      lean: true
    })
    .then(categoriesDB => {
      res.render("admin/index", {
        title: "Sign up",
        partial: "signup",
        categories: categoriesDB
      });
    })
    .catch(err => next());
});

// Add user
router.post("/signup", (req, res) => {
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

module.exports = router;
