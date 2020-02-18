const models = require("./models/customCategoryModels");
const fs = require("fs");
const util = require("util");

module.exports = (req, res, next) => {
  //remove model
  for (const model in models) {
    models[model].model = "";
  }
  models[req.body.nameInDoc] = {
    displayName: req.body.displayName,
    fields: req.body.collections
  };
  console.log(models);

  let fileContent = "";
  fileContent += 'const mongoose = require("mongoose"); \n';
  fileContent += 'const partials = require("./customCategoryPartials.js");\n\n';
  fileContent += "let models = ";
  fileContent += util.inspect(models, false, null, false);
  fileContent += "\n\n";
  fileContent += "partials.modelsInit(models);\n";
  fileContent += "module.exports = models;";

  // Write to file
  fs.writeFile("./api/models/customCategoryModels.js", fileContent, function(
    err
  ) {
    if (err) throw err;
    console.log("Saved!");
  });
};

// products: {
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
// }
