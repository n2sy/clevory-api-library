const express = require("express");
let multer = require("multer");
const avatarController = require("../controllers/avatar.controller");

const router = express.Router();

const MIME_TYPE_OBJ = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

let upload = multer.diskStorage({
  destination: (req, file, callback) => {
    const isValid = MIME_TYPE_OBJ[file.mimetype];
    let err = null;
    if (!isValid) {
      err = new Error("Format Invalid");
    }
    callback(err, "./images");
  },
  filename: (req, file, callback) => {
    const newName = file.originalname.toLowerCase().slice(0, 3);
    const extension = MIME_TYPE_OBJ[file.mimetype];
    callback(null, newName + "-" + Date.now() + "." + extension);
  },
});

router.post(
  "",
  multer({ storage: upload }).single("avatar"),
  avatarController.addAvatar
);

module.exports = router;
