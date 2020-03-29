const mongoose = require("mongoose");
const UserRoleModel = require("./../models/userRoleModel");

module.exports = () => {
  UserRoleModel.find({ name: "master" })
    .then(response => response.length)
    .then(exists => {
      if (exists) console.log("master exists");
      else {
        const newDocument = new UserRoleModel({
          _id: new mongoose.Types.ObjectId(),
          name: "master",
          description: "all permissions"
        });
        return newDocument.save();
      }
    })
    .catch(err => console.log(err));

  UserRoleModel.find({ name: "public" })
    .then(response => response.length)
    .then(exists => {
      if (exists) console.log("public exists");
      else {
        const newDocument = new UserRoleModel({
          _id: new mongoose.Types.ObjectId(),
          name: "public",
          description: "Not logged in"
        });
        return newDocument.save();
      }
    })
    .catch(err => console.log(err));
};
