const mongoose = require("mongoose");
const category = require("./categoryModel.js");
const partials = require("./customCategoryPartials.js");

let categoryObj;

let getCategories = new Promise(function(resolve, reject) {
  if (categoryObj) {
    resolve("categoryObj");
  }
  category
    .find({}, "-__v", { lean: true }, (err, data) => {
      if (err) console.log(err);
    })
    .then(data => {
      categoryObj = partials.modelsInit(data);
      resolve(categoryObj);
    })
    .catch(err => {
      reject();
      // console.log(err);
      // res.status("500").json({
      //   error: err
      // });
    });
});

module.exports = getCategories;
