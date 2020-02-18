const mongoose = require("mongoose");

// Set model for each category
module.exports.modelsInit = models => {
  for (const modelName in models) {
    const model = models[modelName];
    console.log(modelName);

    let obj = { _id: mongoose.Schema.Types.ObjectId };

    model.fields.forEach(field => {
      obj[field.nameInDoc] = {
        type: field.dataType,
        required: field.required,
        unique: field.unique
      };
    });

    model.model = mongoose.model(modelName, mongoose.Schema(obj));
  }
};
