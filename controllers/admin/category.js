const categoryModel = require("../../models/categoryModel");
const mongoose = require("mongoose");

// Input type to data type
let input2data = {
  number: "number",
  radio: "string",
  date: "string",
  select: "string",
  text: "string",
  textArea: "string",
  file: "string",
  imageFile: "string",
  checkbox: "array"
};

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
    // add rewrite Obj
    let displayName = req.body.displayName;
    let nameInDoc = req.body.nameInDoc;

    let rewriteObj = {};
    rewriteObj[displayName] = nameInDoc;

    req.body.collections.forEach(collection => {
      rewriteObj[collection.nameInDoc] = collection.displayName;
      if (collection.inputType === "imageFile") {
        collection.inputType = "file";
        collection.fileType = "image";
      }

      //elm.value == "radio" || elm.value == "checkbox"
      if (
        !collection.multiple ||
        collection.inputType == "radio" ||
        collection.inputType == "checkbox"
      ) {
        collection.multiple = false;
      }
      if (!collection.required) collection.required = false;
      if (!collection.unique) collection.unique = false;
      collection.dataType = input2data[collection.inputType];

      collection.options = [];
      if (typeof collection.optionName === "string") {
        collection.options.push({
          name: collection.optionName,
          value: collection.optionVal
        });
      } else if (typeof collection.optionName === "object") {
        for (let i = 0; i < collection.optionName.length; i++) {
          const optionName = collection.optionName[i];
          const optionVal = collection.optionVal[i];

          collection.options.push({
            name: optionName,
            value: optionVal
          });
        }
      }
    });

    req.body.rewriteObj = rewriteObj;

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
