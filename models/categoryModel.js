const mongoose = require("mongoose");

// Create schema for options
const optionsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    value: { type: String, required: true }
  },
  { _id: false }
);

// Create schema for collections
const collectionsSchema = new mongoose.Schema(
  {
    inputType: { type: String, required: true },
    fileType: { type: String, required: false },
    displayName: { type: String, required: true },
    nameInDoc: { type: String, required: true },
    dataType: { type: String, required: true },
    required: { type: Boolean, required: true },
    unique: { type: Boolean, required: true },
    options: [optionsSchema],
    multiple: { type: Boolean, required: true }
  },
  { _id: false }
);

// Create main Schema
const categorySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    nameInDoc: { type: String, required: true, unique: true },
    displayName: { type: String, required: true, unique: true },
    collections: [collectionsSchema],
    rewriteObj: { type: Object, required: true }
  },
  { collection: "jr_category" }
);

categorySchema.pre("save", function(next) {
  //Check if collecions is empty array befor passing it to schema
  if (this.collections.length < 1) {
    let err = { message: "No fields were selected" };
    return next(err);
  }
  //Check if option any option fields were created
  this.collections.forEach(collection => {
    if (
      collection.inputType === "select" ||
      collection.inputType === "checkbox" ||
      collection.inputType === "radio"
    ) {
      if (collection.options.length < 1) {
        let err = {
          message: "Empty option fields"
        };
        return next(err);
      }
    }
  });

  //Check if there's duplicate nameInDoc's
  let nameInDocs = [this.nameInDoc];

  this.collections.forEach(collection => {
    if (nameInDocs.includes(collection.nameInDoc)) {
      let err = {
        message:
          "Document name has to be unique. Multiple fields with document name: " +
          collection.nameInDoc
      };
      return next(err);
    }
    nameInDocs.push(collection.nameInDoc);
  });

  next();
});

module.exports = mongoose.model("jr_category", categorySchema);
