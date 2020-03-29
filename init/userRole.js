const mongoose = require("mongoose");
const UserRoleModel = mongoose.models["userRole"];

module.exports = () => {
  UserRoleModel.find({ name: "master" })
    .then(response => response.length)
    .then(exists => {
      if (exists) return;
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
      if (exists) return;
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

  UserRoleModel.find({ name: "admin" })
    .then(response => response.length)
    .then(exists => {
      if (exists) return;
      else {
        const newDocument = new UserRoleModel({
          _id: new mongoose.Types.ObjectId(),
          name: "admin",
          description: "administrator"
        });
        return newDocument.save();
      }
    })
    .catch(err => console.log(err));
};
