const mongoose = require("mongoose");
const partials = require("./customCategoryPartials.js");

const mongoose = require("mongoose");
const partials = require("./customCategoryPartials.js");

let models = {};

partials.modelsInit(models);
module.exports = models;

// let models = {
//   products: {
//     displayName: "Products",
//     fields: [
//       {
//         displayname: "name",
//         nameInDoc: "name",
//         inputType: "field",
//         dataType: "string",
//         required: true,
//         unique: false
//       },
//       {
//         displayname: "price",
//         nameInDoc: "price",
//         inputType: "field",
//         dataType: "number",
//         required: false,
//         unique: false
//       }
//     ],
//     model: ""
//   }
// };