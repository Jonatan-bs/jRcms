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

  // .then(result => {
  //   res.status("201").json({
  //     message: "Document created",
  //     createdDocument: newDocument
  //   });
  //   if (callback) {
  //     callback();
  //   }
  // })
  // .catch(err => {
  //   console.log(err);
  //   res.status("500").json({
  //     error: err
  //   });
  // });
};

// Get all from db
module.exports.getFromDB = (model, target, properties, param) => {
  // show all documents from collection
  return model.find(target, properties, param).then(data => data);
};
