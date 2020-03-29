const mongoose = require("mongoose");
const UserModel = mongoose.models["user"];
const masterUser = require("./../setup.js").masterUser;

module.exports = () => {
  UserModel.find({ email: masterUser.email })
    .then(response => response.length)
    .then(exists => {
      if (exists) console.log("masterUser exists");
      else {
        const newDocument = new UserModel({
          _id: new mongoose.Types.ObjectId(),
          email: masterUser.email,
          firstname: masterUser.firstname,
          lastname: masterUser.lastname,
          password: masterUser.password,
          role: "master"
        });
        return newDocument.save();
      }
    })
    .catch(err => console.log(err));
};
