const mongoose = require("mongoose");

// Add to database
module.exports.addToDB = (req, res, schema, callback) => {
  const newDocument = new schema({
    _id: new mongoose.Types.ObjectId(),
    ...req.body
  });
  return newDocument.save().then(response => {
    return {
      message: "Document created",
      createdDocument: newDocument
    };
  });
};

// Get all from db
// module.exports.getFromDB = (model, target, properties, param) => {
//   // show all documents from collection
//   return model.find(target, properties, param).then(data => data);
// };
