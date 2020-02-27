const categoryModel = require("../../models/categoryModel");
const mongoose = require("mongoose");
const formData = require("./modules/formData");

function updateFormData(obj) {
  createRewriteObj(obj);

  obj.groups.forEach(group => {
    group.fields.forEach(field => {
      if (field.inputType === "imageFile") {
        field.inputType = "file";
        field.fileType = "image";
      }
    });

    // if (
    //   !collection.multiple ||
    //   collection.inputType == "radio" ||
    //   collection.inputType == "checkbox"
    // ) {
    //   collection.multiple = false;
    // }
    // if (!collection.required) collection.required = false;
    // if (!collection.unique) collection.unique = false;

    // collection.dataType = input2data[collection.inputType];
    // collection.options = [];
    // if (typeof collection.optionName === "string") {
    //   collection.options.push({
    //     name: collection.optionName,
    //     value: collection.optionVal
    //   });
    // } else if (typeof collection.optionName === "object") {
    //   for (let i = 0; i < collection.optionName.length; i++) {
    //     const optionName = collection.optionName[i];
    //     const optionVal = collection.optionVal[i];
    //     collection.options.push({
    //       name: optionName,
    //       value: optionVal
    //     });
    //   }
    // }
  });
}

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
    try {
      formData.createRewriteObj(req.body);
      formData.updateData(req.body);
      res.send(req.body);
    } catch {
      res.send({ error: "faulty form data" });
      res.end();
    }

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
