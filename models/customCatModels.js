const category = require("./categoryModel.js");
const mongoose = require("mongoose");

// Get all categories from database and create models

let Initialised = false;

let initCatModels = reInitialise => {
  if (Initialised && !reInitialise) {
    return new Promise((resolve, reject) => {
      resolve("Category already Initialised");
    });
  }

  return category
    .find({}, "-__v", { lean: true })
    .then(categories => {
      setModels(categories);

      return new Promise((resolve, reject) => {
        Initialised = true;
        resolve("Category objects initialised");
      });
    })
    .catch(err => console.log(err));
};

module.exports = initCatModels;
initCatModels();
// setModelsForEachCategory

function setModels(objs) {
  objs.forEach(obj => {
    if (mongoose.connection.models[obj.nameID]) return;
    let schemaObj = {
      _id: mongoose.Schema.Types.ObjectId,
      name: { type: String, required: true, unique: true },
      nameID: { type: String, required: true, unique: true },
      fields: { type: [], required: true, unique: true }
    };

    mongoose.model(
      obj.nameID,
      mongoose.Schema(schemaObj, {
        collection: obj.nameID
      })
    );
  });
}

// function createSchemaObj(objs, schemaObj, parent) {
//   objs.forEach(group => {
//     group.fields.forEach(field => {
//       if (field.inputType === "image") {
//         path[field.nameInDoc] = [
//           {
//             type: {
//               type: String,
//               required: true
//             },
//             originalname: {
//               type: String,
//               required: true
//             },
//             mimetype: {
//               type: String,
//               required: true
//             },
//             destination: {
//               type: String,
//               required: true
//             },
//             filename: {
//               type: String,
//               required: true
//             },
//             size: {
//               type: String,
//               required: true
//             }
//           }
//         ];
//       } else {
//         path[field.nameInDoc] = {
//           type: field.dataType,
//           required: field.required,
//           unique: field.unique
//         };
//       }
//     });
//   });
// }
