const mongoose = require("mongoose");

// Create schema for collections
const collectionsSchema = new mongoose.Schema({
  inputType: { type: String, required: true },
  displayName: { type: String, required: true },
  nameInDoc: { type: String, required: true },
  dataType: { type: String, required: true },
  required: { type: Boolean, required: true },
  unique: { type: Boolean, required: true }
});

// Create main Schema
const categorySchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    nameInDoc: { type: String, required: true },
    displayName: { type: String, required: true },
    collections: [collectionsSchema]
  },
  { collection: "jr_category" }
);

//Chek if collecions is empty array befor passing it to schema
categorySchema.pre("save", function(next) {
  if (this.collections.length < 1) {
    next("No fields were selected");
  } else {
    next();
  }
});

module.exports = mongoose.model("jr_category", categorySchema);
