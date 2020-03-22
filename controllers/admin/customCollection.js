const customCollectionDataModel = require("../../models/customCollectionDataModels");
const mongoose = require("mongoose");
const initCatModels = require("../../models/customCollectionModels");

controller = {
  retrieve: (req, res, next) => {
    const collection = req.params.collection;
    const model = mongoose.models[collection];

    return model
      .find({}, "", {
        lean: true
      })
      .then(response => {
        res.status("201").json(response);
      })
      .catch(next);
  },
  create: (req, res, next) => {
    let collection = req.params.collection;
    // insert image data
    req.files.forEach(file => {
      if (!req.body[file.fieldname]) {
        req.body[file.fieldname] = {
          originalname: file.originalname,
          mimetype: file.mimetype,
          destination: file.destination,
          filename: file.filename,
          size: file.size
        };
      }
    });

    initCatModels()
      .then(() => {
        model = mongoose.models[collection];
        return new model({
          _id: new mongoose.Types.ObjectId(),
          ...req.body
        });
      })
      .then(newDocument => {
        return newDocument.save();
      })
      .then(savedDocument => {
        res.status("201").json({
          message: "Document created",
          createdDocument: savedDocument
        });
      })
      .catch(err => res.status("500").json(err));
  },

  update: (req, res, next) => {
    const collection = req.params.collection;
    const id = req.params.id;
    const model = mongoose.models[collection];

    // insert image data
    req.files.forEach(file => {
      if (!req.body[file.fieldname]) {
        req.body[file.fieldname] = {
          originalname: file.originalname,
          mimetype: file.mimetype,
          destination: file.destination,
          filename: file.filename,
          size: file.size,
          type: "image"
        };
      }
    });

    model
      .updateOne({ _id: id }, { $set: req.body }, { runValidators: true })
      .then(document => {
        res.status("201").json({
          message: "Document updated"
        });
      })
      .catch(err => res.status("500").json({ err }));
  }
};
module.exports = controller;
