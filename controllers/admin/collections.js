const customCollectionDataModel = require("../../models/customCollectionDataModels");
const mongoose = require("mongoose");

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
      .find({}, "name nameID", {
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
  updateCollectionPage: (req, res, next) => {
    const id = req.params.collectionID;

    customCollectionDataModel
      .find({}, "", {
        lean: true
      })
      .then(collectionsDB => {
        collection = collectionsDB.find(element => element._id == id);
        res.render("admin/index", {
          title: "Update " + "",
          partial: "updateCollection",
          collection: collection,
          collections: collectionsDB
        });
      })
      .catch(next);
  },
  updateCollection: (req, res, next) => {
    const id = req.params.collectionID;

    // customCollectionDataModel
    //   .find({}, "", {
    //     lean: true
    //   })
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(next);

    customCollectionDataModel
      .updateOne({ _id: id }, { $set: req.body }, { runValidators: true })
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
