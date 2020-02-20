const mongoose = require("mongoose");

// Add to database
module.exports.addToDB = (req, res, schema) => {
  const newDocument = new schema({
    _id: new mongoose.Types.ObjectId(),
    ...req.body
  });
  console.log(req.body);
  console.log(newDocument);
  newDocument
    .save()
    .then(result => {
      // console.log('result');
      res.status("201").json({
        message: "Document created",
        createdDocument: newDocument
      });
    })
    .catch(err => {
      console.log(err);
      res.status("500").json({
        error: err
      });
    });
};

// Get all from db PROMISE
module.exports.getFromDB = (model, target, properties, param) => {
  return new Promise((resolve, reject) => {
    // show all documents from collection
    model
      .find(target, properties, param, (err, documents) => {
        if (err) reject(err);
      })
      .then(data => resolve(data));
  });
};
