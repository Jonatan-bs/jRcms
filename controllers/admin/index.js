const categoryModel = require("../../models/categoryModel");

controller = {
  getMainPage: (req, res, next) => {
    return categoryModel
      .find({}, "displayName nameInDoc -_id", {
        lean: true
      })
      .then(categoriesDB => {
        res.render("admin/index", {
          title: "index",
          partial: "index",
          categories: categoriesDB
        });
      })
      .catch(next);
  }
};
module.exports = controller;
