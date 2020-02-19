const mongoose = require("mongoose");
//const partials = require("./customCategoryPartials.js");

let models = {
  jr_product: {
    nameInDoc: "jr_product",
    displayName: "Product",
    fields: [
      {
        inputType: "text",
        displayName: "Name",
        nameInDoc: "jr_name",
        dataType: "string",
        required: true,
        unique: true
      },
      {
        inputType: "number",
        displayName: "Price",
        nameInDoc: "jr_price",
        dataType: "number",
        required: true,
        unique: false
      }
    ],
    rewriteObj: { jr_name: "Name", jr_price: "Price" },
    model: ""
  }
};

//partials.modelsInit(models);
module.exports = models;
