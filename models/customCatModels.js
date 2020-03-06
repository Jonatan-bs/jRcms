const category = require("./categoryModel.js");
const mongoose = require("mongoose");

// Get all categories from database and create models

let Initialised = false;

let initCatModels = reInitialise => {
  if (Initialised && !reInitialise) {
    return new Promise((resolve, reject) => {
      resolve("Category already Initialised");
    });
  }

  return category
    .find({}, "-__v", { lean: true })
    .then(categories => {
      setModels(categories);

      return new Promise((resolve, reject) => {
        Initialised = true;
        resolve("Category objects initialised");
      });
    })
    .catch(err => console.log(err));
};

module.exports = initCatModels;
initCatModels();
// setModelsForEachCategory

function setModels(objs) {
  objs.forEach(obj => {
    if (mongoose.connection.models[obj.nameID]) return;
    let schemaObj = {
      _id: mongoose.Schema.Types.ObjectId
    };

    obj.fields.forEach(field => {
      if (field.contentType === "image") {
        schemaObj[field.nameID] = {
          type: { type: String, required: true, default: "image" },
          originalname: { type: String, required: true },
          mimetype: { type: String, required: true },
          destination: { type: String, required: true },
          filename: { type: String, required: true },
          size: { type: Number, required: true }
        };
      } else {
        schemaObj[field.nameID] = {
          type: field.dataType,
          required: field.required,
          unique: field.unique
        };
      }
    });
    let schema = mongoose.Schema(schemaObj, {
      collection: obj.nameID
    });
    schema.virtual("rewriteObj").get(function() {
      return obj.rewriteObj;
    });
    schema.virtual("contentType").get(function() {
      return obj.contentType;
    });
    // , versionKey=true
    schema.set("toObject", { getters: true });

    mongoose.model(obj.nameID, schema);
  });
}
