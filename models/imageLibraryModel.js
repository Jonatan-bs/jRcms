const mongoose = require("mongoose");

const imgLibrarySchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    alt: { type: String, required: true },
    description: { type: String, required: true, default: "" },
    originalname: { type: String, required: true },
    mimetype: { type: String, required: true },
    destination: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true }
  },
  { collection: "imgLibrary", timestamps: true }
);

module.exports = mongoose.model("imgLibrary", imgLibrarySchema);
