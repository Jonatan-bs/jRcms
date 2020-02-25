const express = require("express");
const router = express.Router();
const multer = require("multer"); // Handle file uploads
const upload = multer({ dest: "admin/uploads/" }); // Handle file uploads
const indexCtrl = require("../controllers/admin/index");
const userCtrl = require("../controllers/admin/user");
const categoryCtrl = require("../controllers/admin/category");
const customCategoryCtrl = require("../controllers/admin/customCategory");

/////////////////
//// MAIN PAGE
/////////////////
router.get("/", indexCtrl.getMainPage);

/////////////////
//// CATEGORY
/////////////////

// Add category page
router.get("/category", categoryCtrl.newCategoryPage);

// Add category
router.post("/category", categoryCtrl.addCategory);

/////////////////
//// USERS
/////////////////

// Add user page
router.get("/signup", userCtrl.signupPage);

// Add user
router.post("/signup", userCtrl.addUser);

module.exports = router;

/////////////////
//// CUSTOM CATEGORIES
/////////////////

// Custom category page
router.get("/:category", customCategoryCtrl.getPage);

// Add custom category document page
router.get("/:category/add", customCategoryCtrl.addDocumentPage);

// Add custom category document
router.post("/:category/add", customCategoryCtrl.addDocument);
