const mongoose = require("mongoose");
const category = require("./categoryModel.js");
const partials = require("./customCategoryPartials.js");

let categoryObj;

let getCategories = reset => {
  return new Promise(function(resolve, reject) {
    if (categoryObj && !reset) {
      resolve(categoryObj);
    }
    categoryObj = null;

    category
      .find({}, "-__v", { lean: true }, (err, data) => {
        if (err) console.log(err);
      })
      .then(data => {
        categoryObj = partials.modelsInit(data);
        resolve(categoryObj);
      })
      .catch(err => {
        reject(err);
        // console.log(err);
        // res.status("500").json({
        //   error: err
        // });
      });
  });
};
module.exports = getCategories;
