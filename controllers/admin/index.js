const customCollectionDataModel = require("../../models/customCollectionDataModels");

controller = {
  getMainPage: (req, res, next) => {
    return customCollectionDataModel
      .find({}, "name nameID -_id", {
        lean: true
      })
      .then(collectionsDB => {
        res.render("admin/index", {
          title: "index",
          partial: "index",
          collections: collectionsDB
        });
      })
      .catch(next);
  }
};
module.exports = controller;
