const mongoose = require("mongoose");

const PermissionSchema = mongoose.Schema({
  name: { type: Boolean, required: true },
  find: { type: Boolean, required: true },
  findOne: { type: Boolean, required: true },
  create: { type: Boolean, required: true },
  delete: { type: Boolean, required: true },
  update: { type: Boolean, required: true }
});

const UserRoleSchema = mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: false, default: "" },
    permissions: { type: [PermissionSchema] }
  },
  { collection: "userRole" }
);

module.exports = mongoose.model("userRole", UserRoleSchema);
