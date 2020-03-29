const customCollectionDataModel = require("../../models/customCollectionDataModels");
const mongoose = require("mongoose");
const initCatModels = require("../../models/customCollectionModels");
const ImageLibrary = require("./../../models/imageLibraryModel");

controller = {
  retrieve: (req, res, next) => {
    const collection = req.params.collection;
    const body = req.body;
    const query = body.query ? body.query : {};
    const options = body.options ? body.options : { lean: true };
    const fields = body.fields ? body.fields : null;
    const model = mongoose.models[collection];

    return model
      .find(query, fields, options)
      .populate({
        path: "images.imageID image.imageID"
      })
      .then(response => {
        res.status("201").json(response);
      })
      .catch(next);
  },
  create: (req, res, next) => {
    let collection = req.params.collection;
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
    model
      .findById(id)
      .then(doc => {
        for (const key in req.body) {
          const field = req.body[key];
          doc[key] = field;
        }
        return doc.save();
      })

      .then(document => {
        res.status("201").json({
          message: "Document updated"
        });
      })
      .catch(err => res.status("500").json({ err }));
  }
};
module.exports = controller;
