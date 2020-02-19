const mongoose = require("mongoose");

// Set model for each category
module.exports.modelsInit = models => {
  let categoryObj = {};
  for (const modelName in models) {
    const model = models[modelName];

    //Create rewrite object
    let rewriteObj = {};
    for (const collection of model.collections) {
      rewriteObj[collection.nameInDoc] = collection.displayName;
    }
    model.rewriteObj = rewriteObj;

    let schemaObj = { _id: mongoose.Schema.Types.ObjectId };
    model.collections.forEach(collection => {
      schemaObj[collection.nameInDoc] = {
        type: collection.dataType,
        required: collection.required,
        unique: collection.unique
      };
    });
    model.model = mongoose.model(
      model.nameInDoc,
      mongoose.Schema(schemaObj, {
        collection: model.nameInDoc
      })
    );
    categoryObj[model.nameInDoc] = model;
  }

  return categoryObj;
};
