const models = require("./models/customCategoryModels");
const fs = require("fs");
const util = require("util");

module.exports = (req, res, next) => {
  //remove model property
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
  fs.writeFile("./api/models/customCategoryModels.js", fileContent, err => {
    if (err) throw err;
    console.log("Saved!");
    res.end(`{"message":"Category (${req.body.displayName}) has been added"}`);
  });
};
