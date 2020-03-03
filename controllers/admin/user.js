const categoryModel = require("../../models/categoryModel");
const User = require("../../models/userModel");
const mongoose = require("mongoose");

controller = {
  addUser: (req, res, next) => {
    const newDocument = new User({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });
    newDocument
      .save()
      .then(() => {
        res.status("201").json({
          message: "Document created",
          createdDocument: newDocument
        });
      })
      .catch(next);
  },
  signupPage: (req, res, next) => {
    categoryModel
      .find({}, "name nameID -_id", {
        lean: true
      })
      .then(categoriesDB => {
        res.render("admin/index", {
          title: "Sign up",
          partial: "signup",
          categories: categoriesDB
        });
      })
      .catch(next);
  }
};
module.exports = controller;
