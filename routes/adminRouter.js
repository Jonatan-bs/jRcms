const express = require("express");
const router = express.Router();
const multer = require("multer"); // Handle file uploads
const indexCtrl = require("../controllers/admin/index");
const userCtrl = require("../controllers/admin/user");
const categoryCtrl = require("../controllers/admin/category");
const customCategoryCtrl = require("../controllers/admin/customCategory");

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "admin/uploads/");
  },
  filename: function(req, file, callback) {
    callback(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, callback) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    // Accept file
    callback(null, true);
  } else {
    // reject file
    callback(null, false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter }); // Handle file uploads

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
router.post("/category", upload.any(), categoryCtrl.addCategory);

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
router.post("/:category/add", upload.any(), customCategoryCtrl.addDocument);
