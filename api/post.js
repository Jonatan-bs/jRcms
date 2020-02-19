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
      //console.log(result);
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
