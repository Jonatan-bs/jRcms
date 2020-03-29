const express = require("express");
const router = express.Router();
const multer = require("multer"); // Handle file uploads
// const indexCtrl = require("../controllers/admin/index");
const collectionCtrl = require("../controllers/admin/ccData");
const customCollectionCtrl = require("../controllers/admin/customCollection");
const userCtrl = require("../controllers/admin/user");
const imageLibraryCtrl = require("../controllers/admin/imageLibrary");
const userRoleCtrl = require("../controllers/admin/userRole");

// MULTER MIDDLEWARE
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
// router.get("/", indexCtrl.getMainPage);

/////////////////
//// COLLECTION
/////////////////

// retrieve collections
router.post("/ccData", collectionCtrl.retrieve);

// create collections
router.post("/ccData/create", collectionCtrl.create);

// update collections
router.post("/ccData/update/:collectionID", collectionCtrl.update);

/////////////////
//// USERS
/////////////////

// create user
router.post("/user/create", userCtrl.create);

// retrieve users
router.post("/user/retrieve", userCtrl.retrieve);

// signIn
router.post("/user/signin", userCtrl.signIn);

// update user
router.post("/user/update/:id", userCtrl.update);

/////////////////
//// USER ROLES
/////////////////

// retrieve user userroles
router.post("/userrole", userRoleCtrl.retrieve);

// create user userrole
router.post("/userrole/create", userRoleCtrl.create);

// delete userrole
router.post("/userrole/delete/:id", userRoleCtrl.delete);

// update userroles
router.post("/userrole/update/:id", userRoleCtrl.update);

/////////////////
//// IMAGE LIBRARY
/////////////////

// create image
router.post(
  "/imageLibrary/create",
  upload.single("image"),
  imageLibraryCtrl.create
);

// update image
router.post("/imageLibrary/update/:id", imageLibraryCtrl.update);

// retrieve images
router.post("/imageLibrary", imageLibraryCtrl.retrieve);

/////////////////
//// CUSTOM collections
/////////////////

// retrieve documents
router.post("/cc/:collection", customCollectionCtrl.retrieve);

// create custom collection document
router.post("/cc/:collection/create", customCollectionCtrl.create);

// update document
router.post(
  "/cc/:collection/update/:id",

  customCollectionCtrl.update
);

module.exports = router;
