const mongoose = require("mongoose");
const UserModel = mongoose.models["user"];
const masterUser = require("./../setup.js").masterUser;
const bcrypt = require("bcryptjs");

module.exports = () => {
  UserModel.findOne({ email: masterUser.email })
    .then(master => {
      let updated = false;
      if (master) {
        for (const key in masterUser) {
          if (key === "password") {
            if (!bcrypt.compareSync(masterUser[key], master[key])) {
              updated = true;
              break;
            }
          } else if (masterUser[key] !== master[key]) {
            updated = true;
            break;
          }
        }
      }

      if (updated) {
        return master.remove();
      } else if (!updated && !master) {
        return false;
      } else {
        return true;
      }
    })
    .then(exists => {
      if (exists) return "master user exists unchanged";
      const newDocument = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        email: masterUser.email,
        firstname: masterUser.firstname,
        lastname: masterUser.lastname,
        password: masterUser.password,
        role: "master"
      });
      return newDocument.save();
    })
    .then(res => {
      //console.log(res);
    })
    .catch(err => console.log(err));
};
