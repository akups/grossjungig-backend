const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.cloudKey,
  api_secret: process.env.cloudSecret,
});

const trimExtension = (fileName) => {
  return fileName.split(".").slice(0, -1).join(".");
};

const storage = cloudinaryStorage({
  cloudinary,
  folder: "thing-gallery", // The name of the folder in cloudinary
  allowedFormats: ["jpg", "png"],
  // params: { resource_type: 'raw' }, => this is in case you want to upload other type of files, not just images
  filename: (req, file, cb) => {
    cb(null, trimExtension(file.originalname));
    // The file on cloudinary would have the same name as the original file name, and we trim the extension (because cloudinary appends it on top)
  },
});

const uploader = multer({ storage: storage });
module.exports = uploader;
