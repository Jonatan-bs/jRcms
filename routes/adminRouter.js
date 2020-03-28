const express = require("express");
const router = express.Router();
const multer = require("multer"); // Handle file uploads
// const indexCtrl = require("../controllers/admin/index");
const collectionCtrl = require("../controllers/admin/ccData");
const customCollectionCtrl = require("../controllers/admin/customCollection");
const userCtrl = require("../controllers/admin/user");

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
//// CUSTOM collections
/////////////////

// retrieve documents
router.post("/cc/:collection", customCollectionCtrl.retrieve);

// create custom collection document
router.post(
  "/cc/:collection/create",
  upload.any(),
  customCollectionCtrl.create
);

// update document
router.post(
  "/cc/:collection/update/:docID",
  upload.any(),
  customCollectionCtrl.update
);

module.exports = router;
