const express = require("express");
const router = express.Router();
const multer = require("multer"); // Handle file uploads
const indexCtrl = require("../controllers/admin/index");
const userCtrl = require("../controllers/admin/user");
const collectionCtrl = require("../controllers/admin/collections");
const apiCtrl = require("../controllers/admin/api");
const customCollectionCtrl = require("../controllers/admin/customCollection");

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
//// COLLECTION
/////////////////

// collections page
router.get("/collections", collectionCtrl.collectionsPage);

// Add Collection page
router.get("/collections/add", collectionCtrl.addCollectionPage);

// Add collection
router.post("/collections/add", collectionCtrl.addCollection);

// Update collection page
router.get(
  "/collections/update/:collectionID",
  collectionCtrl.updateCollectionPage
);

// Update collection
router.post(
  "/collections/update/:collectionID",
  collectionCtrl.updateCollection
);

/////////////////
//// USERS
/////////////////

// Add user page
router.get("/signup", userCtrl.signupPage);

// Add user
router.post("/signup", userCtrl.addUser);

module.exports = router;

/////////////////
//// API
/////////////////

// Custom collection page
router.post("/api/:collection", apiCtrl.getData);

/////////////////
//// CUSTOM collections
/////////////////

// Custom collection page
router.get("/:collection", customCollectionCtrl.getPage);

// Add custom collection document page
router.get("/:collection/add", customCollectionCtrl.addDocumentPage);

// Add custom collection document
router.post("/:collection/add", upload.any(), customCollectionCtrl.addDocument);

// document page
router.get("/:collection/:id", customCollectionCtrl.docPage);

// update document
router.post(
  "/:collection/:id/update",
  upload.any(),
  customCollectionCtrl.updateDoc
);
