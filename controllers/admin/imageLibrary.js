const ImageLibrary = require("../../models/imageLibraryModel");
const mongoose = require("mongoose");

controller = {
  create: (req, res, next) => {
    let file = req.file;

    req.body.originalname = file.originalname;
    req.body.mimetype = file.mimetype;
    req.body.destination = file.destination;
    req.body.filename = file.filename;
    req.body.size = file.size;

    const newDocument = new ImageLibrary({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      alt: req.body.alt,
      description: req.body.description,
      originalname: req.body.originalname,
      mimetype: req.body.mimetype,
      destination: req.body.destination,
      filename: req.body.filename,
      size: req.body.size
    });

    newDocument
      .save()
      .then(response => {
        res.status("201").json({
          message: "Image added"
        });
      })
      .catch(err => {
        res.status("500").json(err);
      });
  },
  update: (req, res, next) => {
    const id = req.params.id;
    let file = req.file;
    req.body.originalname = file.originalname;
    req.body.mimetype = file.mimetype;
    req.body.destination = file.destination;
    req.body.filename = file.filename;
    req.body.size = file.size;

    ImageLibrary.findById(id)
      .then(doc => {
        for (const key in req.body) {
          const field = req.body[key];
          doc[key] = field;
        }
        return doc.save();
      })

      .then(document => {
        res.status("201").json({
          message: "Document updated"
        });
      })
      .catch(err => res.status("500").json({ err }));
  }
  // retrieve: (req, res, next) => {
  //   const body = req.body;
  //   const query = body.query ? body.query : {};
  //   const options = body.options ? body.options : { lean: true };
  //   const fields = body.fields ? body.fields : null;
  //   User.find(query, fields, options)
  //     .then(response => {
  //       res.status("201").json(response);
  //     })
  //     .catch(err => {
  //       res.send({ err });
  //     });
  // },
  // signIn(req, res, next) {
  //   User.findOne({ email: req.body.email })
  //     .then(user => {
  //       console.log(user.comparePassword(req.body.password));
  //     })
  //     .catch(err => res.send({ err }));
  // }
};
module.exports = controller;
