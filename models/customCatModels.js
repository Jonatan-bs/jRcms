const category = require("./categoryModel.js");
const mongoose = require("mongoose");

// Get all categories from database and create models

let Initialised = false;

let initCatModels = reInitialise => {
  if (Initialised && reInitialise) {
    return new Promise((resolve, reject) => {
      resolve("Category objects reInitialised");
    });
  }

  return category.find({}, "-__v", { lean: true }).then(categories => {
    setModels(categories);

    return new Promise((resolve, reject) => {
      Initialised = true;
      resolve("Category objects initialised");
    });
  });
};

module.exports = initCatModels;

// setModelsForEachCategory

function setModels(categories) {
  categories.forEach(category => {
    if (!mongoose.connection.models[category.nameInDoc]) {
      let schemaObj = { _id: mongoose.Schema.Types.ObjectId };
      category.collections.forEach(collection => {
        schemaObj[collection.nameInDoc] = {
          type: collection.dataType,
          required: collection.required,
          unique: collection.unique
        };
      });
      mongoose.model(
        category.nameInDoc,
        mongoose.Schema(schemaObj, {
          collection: category.nameInDoc
        })
      );
    }
  });
}
