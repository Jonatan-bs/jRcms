const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
//const User = require("../api/models/userModel");

// Routes
router.get("/", (req, res) => {
  res.render("index", { title: "index", partial: "index" });
});

// Register page
router.get("/newCategory", (req, res) => {
  res.render("index", { title: "new category", partial: "newCategory" });
});

module.exports = router;
