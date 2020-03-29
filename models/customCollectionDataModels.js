const mongoose = require("mongoose");

// Create schema for group
const fieldsSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    nameID: { type: String, required: true, unique: true },
    unique: { type: Boolean, required: true },
    required: { type: Boolean, required: true },
    multi: { type: Boolean, required: true, default: false },
    options: {
      type: [
        {
          name: { type: String, required: true },
          value: { type: String, required: true }
        }
      ],
      _id: false
    }
  },
  { _id: false }
);

// Create main Schema
const collectionSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    nameID: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    description: { type: String },
    fields: { type: [fieldsSchema], required: false }
  },
  { collection: "jr_customCollectionData", timestamps: true }
);

module.exports = mongoose.model("jr_customCollectionData", collectionSchema);
