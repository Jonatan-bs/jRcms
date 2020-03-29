const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, required: true, unique: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
  },
  { collection: "user", timestamps: true }
);

UserSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    // console.log("not modified");
    return next();
  }
  // console.log("modified");
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function(plaintext) {
  return bcrypt.compareSync(plaintext, this.password);
};

module.exports = mongoose.model("user", UserSchema);
