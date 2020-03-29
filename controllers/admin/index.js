const customCollectionDataModel = mongoose.models["jr_customCollectionData"];

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
