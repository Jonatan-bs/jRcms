const mongoose = require("mongoose");

// Create schema for collections
const collectionsSchema = new mongoose.Schema(
  {
    inputType: { type: String, required: true },
    displayName: { type: String, required: true },
    nameInDoc: { type: String, required: true },
    dataType: { type: String, required: true },
    required: { type: Boolean, required: true },
    unique: { type: Boolean, required: true },
    options: { type: Array, required: false }
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
    let err = "No fields were selected";
    return next(err);
  }
  //Check if there's duplicate nameInDoc's
  let nameInDocs = [];
  this.collections.forEach(collection => {
    if (nameInDocs.includes(collection.nameInDoc)) {
      let err =
        "Document name has to be unique. Multiple fields with document name: " +
        collection.nameInDoc;
      return next(err);
    }
    nameInDocs.push(collection.nameInDoc);
  });

  next();
});

module.exports = mongoose.model("jr_category", categorySchema);