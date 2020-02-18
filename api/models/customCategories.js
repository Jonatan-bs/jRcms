const mongoose = require("mongoose");

module.exports = {
  products: {
    form: "aaaaa",
    name: "Products",
    model: mongoose.model(
      "product",
      mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: { type: String, required: true, unique: true },
        price: { type: Number, required: true }
      })
    )
  }
};
