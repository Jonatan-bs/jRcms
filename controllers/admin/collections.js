const customCollectionDataModel = require("../../models/customCollectionDataModels");
const mongoose = require("mongoose");
const formData = require("./modules/formData");
const initCatModels = require("../../models/customCollectionModels");

controller = {
  addCollectionPage: (req, res, next) => {
    customCollectionDataModel
      .find({}, "name nameID -_id", {
        lean: true
      })
      .then(collectionsDB => {
        res.render("admin/index", {
          title: "new collection",
          partial: "newCollection",
          collections: collectionsDB
        });
      })
      .catch(next);
  },
  collectionsPage: (req, res, next) => {
    customCollectionDataModel
      .find({}, "name nameID -_id", {
        lean: true
      })
      .then(collectionsDB => {
        res.render("admin/index", {
          title: "collections",
          partial: "collections",
          collections: collectionsDB
        });
      })
      .catch(next);
  },
  addCollection: (req, res, next) => {
    // req.body.rewriteObj = {};

    // req.body.rewriteObj[req.body.nameID] = req.body.name;
    // req.body.fields.forEach(field => {
    //   req.body.rewriteObj[field.nameID] = field.name;
    // });

    // req.body.contentType = {};
    // req.body.fields.forEach(field => {
    //   req.body.contentType[field.nameID] = field.contentType;
    // });

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
  }
};
module.exports = controller;
