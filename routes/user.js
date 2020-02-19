const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");

//User model//
const User = require("../api/models/userModel");

// Register page
router.get("/signup", (req, res) => {
  res.render("index", { title: "Sign up", partial: "signup" });
});

module.exports = router;
