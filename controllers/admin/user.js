const mongoose = require("mongoose");
const User = mongoose.models["user"];

controller = {
  create: (req, res, next) => {
    const newDocument = new User({
      _id: new mongoose.Types.ObjectId(),
      ...req.body
    });

    newDocument
      .save()
      .then(response => {
        res.status("201").json({
          message: "User created"
        });
      })
      .catch(err => {
        res.status("500").json(err);
      });
  },
  update: (req, res, next) => {
    const id = req.params.id;

    User.findById(id)
      .then(doc => {
        for (const key in req.body) {
          if (req.body.hasOwnProperty(key)) {
            const field = req.body[key];
            doc[key] = field;
          }
        }

        return doc.save();
      })

      .then(document => {
        res.status("201").json({
          message: "Document updated"
        });
      })
      .catch(err => res.status("500").json({ err }));
  },
  retrieve: (req, res, next) => {
    const body = req.body;
    const query = body.query ? body.query : {};
    const options = body.options ? body.options : { lean: true };
    const fields = body.fields ? body.fields : null;
    User.find(query, fields, options)
      .then(response => {
        res.status("201").json(response);
      })
      .catch(err => {
        res.send({ err });
      });
  },
  signIn(req, res, next) {
    User.findOne({ email: req.body.email })
      .then(user => {
        console.log(user.comparePassword(req.body.password));
      })
      .catch(err => res.send({ err }));
  }
};
module.exports = controller;
