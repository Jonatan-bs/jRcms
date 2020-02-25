const categoryModel = require("../../api/models/categoryModel");

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
      .catch(err => next());
  }
};
module.exports = controller;
