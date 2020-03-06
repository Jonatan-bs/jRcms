const mongoose = require("mongoose");

// Create schema for group
const fieldsSchema = new mongoose.Schema(
  {
    dataType: { type: String, required: true },
    contentType: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    nameID: { type: String, required: true, unique: true },
    unique: { type: Boolean, required: true },
    required: { type: Boolean, required: true },
    inputType: { type: String, required: true },
    options: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true }
      }
    ]
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
    fields: { type: [fieldsSchema], required: true },
    rewriteObj: { type: Object },
    contentType: { type: Object }
  },
  { collection: "jr_customCollectionData", timestamps: true }
);

// Extra validation

// collectionSchema.pre("save", function(next) {
//   //Check if collecions is empty array befor passing it to schema
//   if (this.collections.length < 1) {
//     let err = { message: "No fields were selected" };
//     return next(err);
//   }
//   //Check if option any option fields were created
//   this.collections.forEach(collection => {
//     if (
//       collection.inputType === "select" ||
//       collection.inputType === "checkbox" ||
//       collection.inputType === "radio"
//     ) {
//       if (collection.options.length < 1) {
//         let err = {
//           message: "Empty option fields"
//         };
//         return next(err);
//       }
//     }
//   });

//   //Check if there's duplicate nameInDoc's
//   let nameInDocs = [this.nameInDoc];

//   this.collections.forEach(collection => {
//     if (nameInDocs.includes(collection.nameInDoc)) {
//       let err = {
//         message:
//           "Document name has to be unique. Multiple fields with document name: " +
//           collection.nameInDoc
//       };
//       return next(err);
//     }
//     nameInDocs.push(collection.nameInDoc);
//   });

//   next();
// });

module.exports = mongoose.model("jr_customCollectionData", collectionSchema);
