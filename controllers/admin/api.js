const mongoose = require("mongoose");

controller = {
  getData: (req, res, next) => {
    const collection = req.params.collection;
    const model = mongoose.models[collection];
    model
      .find({}, "", {
        lean: true
      })
      .then(collection => {
        res.status("201").json(collection);
      })
      .catch(next);
  }
};
module.exports = controller;
