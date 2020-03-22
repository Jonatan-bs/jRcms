const customCollectionDataModel = require("../../models/customCollectionDataModels");
const mongoose = require("mongoose");
const initCatModels = require("../../models/customCollectionModels");

controller = {
  retrieve: (req, res, next) => {
    const body = req.body;
    const query = body.query ? body.query : {};
    const options = body.options ? body.options : { lean: true };
    const fields = body.fields ? body.fields : null;

    customCollectionDataModel
      .find(query, fields, options)
      .then(response => {
        res.status("201").json(response);
      })
      .catch(next);
  },
  create: (req, res, next) => {
    const newDocument = new customCollectionDataModel({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });

    newDocument
      .save()
      .then(() => {
        initCatModels(true);
        res.status("201").json({
          message: "Document created",
          createdDocument: newDocument
        });
      })
      .catch(err => res.status("500").json(err));
  },

  update: (req, res, next) => {
    const collectionID = req.params.collectionID;

    customCollectionDataModel
      .updateOne(
        { _id: collectionID },
        { $set: req.body },
        { runValidators: true }
      )
      .then(() => {
        initCatModels(true);

        res.status("201").json({
          message: "Document updated"
        });
      })
      .catch(err => res.status("500").json({ err }));
  }
};
module.exports = controller;
