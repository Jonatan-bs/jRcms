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
initCatModels();
// setModelsForEachCategory

function setModels(categories) {
  categories.forEach(category => {
    if (!mongoose.connection.models[category.nameInDoc]) {
      let schemaObj = { _id: mongoose.Schema.Types.ObjectId };
      category.collections.forEach(collection => {
        if (collection.fileType === "image") {
          schemaObj[collection.nameInDoc] = [
            {
              type: {
                type: String,
                required: true
              },
              originalname: {
                type: String,
                required: true
              },
              mimetype: {
                type: String,
                required: true
              },
              destination: {
                type: String,
                required: true
              },
              filename: {
                type: String,
                required: true
              },
              size: {
                type: String,
                required: true
              }
            }
          ];
        } else {
          schemaObj[collection.nameInDoc] = [
            {
              type: String,
              required: collection.required,
              unique: collection.unique
            }
          ];
        }
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
