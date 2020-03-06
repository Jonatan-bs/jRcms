const customCollectionDataModel = require("../../models/customCollectionDataModels");
const mongoose = require("mongoose");
const initCatModels = require("../../models/customCollectionModels");

controller = {
  getPage(req, res, next) {
    prefix = "jr_";
    prefix = "";
    let collection = prefix + req.params.collection;
    let collections;
    let documents;
    let model;

    initCatModels()
      .then(() => {
        // Get model from collection matching req.params.collection
        model = mongoose.models[collection];
        if (!model) throw new Error("Collection doesn't exist!");
        // get all documents from collection
        return model.find({}, "-__v");
      })
      .then(response => {
        console.log(response);
        documents = response;
        return customCollectionDataModel.find({}, "name nameID -_id", {
          lean: true
        });
      })
      .then(response => {
        collections = response;
        return customCollectionDataModel.findOne(
          { nameID: collection },
          "name rewriteObj -_id"
        );
      })
      .then(collection => {
        res.render("admin/index", {
          nameID: req.params.collection,
          title: collection.name,
          partial: "collection",
          documents: documents,
          rewrite: collection.rewriteObj,
          collections: collections
        });
      })
      .catch(next);
  },
  addDocument: (req, res, next) => {
    let collection = req.params.collection;
    // insert image data
    req.files.forEach(file => {
      if (!req.body[file.fieldname]) {
        console.log(mongoose.models[collection].collectionObj);
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
  addDocumentPage: (req, res, next) => {
    prefix = "jr_";
    prefix = "";
    let collectionName = prefix + req.params.collection;
    let collectionsObj;

    initCatModels()
      // Get model from collection matching req.params.collection
      .then(() => {
        return customCollectionDataModel.find({}, "-_id", {
          lean: true
        });
      })
      .then(collections => {
        collectionsObj = collections;
        return customCollectionDataModel.findOne(
          { nameID: collectionName },
          "-_id",
          {
            lean: true
          }
        );
      })
      .then(collection => {
        res.render("admin/index", {
          nameID: collection.nameID,
          title: collection.name,
          partial: "newDocument",
          collection: collection,
          collections: collectionsObj
        });
      })
      .catch(next);
  }
};
module.exports = controller;
