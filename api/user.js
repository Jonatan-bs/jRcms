const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");

//User model//
const User = require("../api/models/userModel");

// add user
router.post("/add", (req, res) => {
  console.log(req.body);

  const newuser = new User({
    _id: new mongoose.Types.ObjectId(),
    mail: req.body.mail,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  });
  newuser
    .save()
    .then(result => {
      console.log(result);
      res.status("201").json({
        message: "Created user",
        createdUser: newuser
      });
    })
    .catch(err => {
      console.log(err);
      res.status("500").json({
        error: err
      });
    });
});

// Delete users
router.post("/delete", (req, res) => {
  User.remove({})
    .then(result => {
      console.log(result);
      res.status("200").json({
        message: "All users were deleted",
        amount: result.deletedCount
      });
    })
    .catch(err => {
      console.log(err);
      res.status("500").json({
        error: err
      });
    });
});

// Return all users
router.get("/", (req, res) => {
  User.find({})
    .then(result => {
      console.log(result);
      res.status("200").json({ result });
    })
    .catch(err => {
      console.log(err);
      res.status("500").json({
        error: err
      });
    });
});

module.exports = router;
