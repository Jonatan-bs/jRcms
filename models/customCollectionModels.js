const mongoose = require("mongoose");
const collection = mongoose.models["jr_customCollectionData"];

const type2Datatype = {
  string: "string",
  number: "number",
  image: "file",
  boolean: "boolean",
  select: "string",
  radio: "string",
  text: "string"
};

// Get all collections from database and create models

let Initialised = false;

let initCatModels = reInitialise => {
  if (Initialised && !reInitialise) {
    return new Promise((resolve, reject) => {
      resolve("Collection already Initialised");
    });
  }

  for (model in mongoose.models) {
    if (
      model === "jr_customCollectionData" ||
      model === "imgLibrary" ||
      model === "user" ||
      model === "userRole"
    )
      continue;
    mongoose.deleteModel(model);
  }

  return collection
    .find({}, "-__v", { lean: true })
    .then(collections => {
      setModels(collections);

      return new Promise((resolve, reject) => {
        Initialised = true;
        resolve("Collection objects initialised");
      });
    })
    .catch(err => console.log(err));
};

module.exports = initCatModels;
initCatModels();
// setModelsForEachCollection

function setModels(objs) {
  objs.forEach(obj => {
    if (mongoose.connection.models[obj.nameID]) return;
    let schemaObj = {
      _id: mongoose.Schema.Types.ObjectId
    };

    obj.fields.forEach(field => {
      if (field.type === "image") {
        schemaObj[field.nameID] = {
          type: [
            {
              _id: false,
              caption: {
                type: "string"
              },
              imageID: {
                type: "string",
                required: true,
                ref: "imgLibrary"
              }
            }
          ]
        };
      } else {
        schemaObj[field.nameID] = {
          type: type2Datatype[field.type],
          required: field.required,
          unique: field.unique
        };
      }
    });
    let schema = mongoose.Schema(schemaObj, {
      collection: obj.nameID,
      id: false
    });

    //create rewrites
    let nameID2name = {};

    nameID2name[obj.nameID] = obj.name;
    obj.fields.forEach(field => {
      nameID2name[field.nameID] = field.name;
    });

    let nameID2contentType = {};
    obj.fields.forEach(field => {
      nameID2contentType[field.nameID] = field.fieldType;
    });

    schema.virtual("rewrite.nameID2name").get(() => nameID2name);
    schema.virtual("rewrite.nameID2fieldType").get(() => nameID2contentType);
    // , versionKey=true
    schema.set("toObject", { getters: true });
    mongoose.model(obj.nameID, schema);
  });
}
