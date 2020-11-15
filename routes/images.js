// const express = require("express");
// const router = express.Router();
// const Image = require("../models/Image");

// // /* Here we'll write the routes for the images */
// router.post('/upload', async (req, res) => {
//     try {
//       const newImage = new Image({
//         imageUrl: req.body.imageUrl
//       });
//       await newImage.save();
//       res.json(newImage.imageUrl);
//     } catch (err) {
//       console.error('Something went wrong', err);
//     }
//   });
//   ​
//  router.get('/getLatest', async (req, res) => {
//     const getImage = await Image.findOne().sort({ _id: -1 });
//     res.json(getImage.imageUrl);
//   });
//  module.exports = router;

const express = require("express");
const router = express.Router();
const Image = require("../models/Image");

// include the model:
//const Thing = require("../models/thing-model");

router.get("/images", (req, res, next) => {
  Image.find()
    .then((imagesFromDB) => {
      res.status(200).json(imagesFromDB);
    })
    .catch((err) => next(err));
});

router.post("/images/create", (req, res, next) => {
  // console.log('body: ', req.body); ==> here we can see that all
  // the fields have the same names as the ones in the model so we can simply pass
  // req.body to the .create() method

  Thing.create(req.body)
    .then((aNewImage) => {
      // console.log('Created new thing: ', aNewThing);
      res.status(200).json(aNewImage);
    })
    .catch((err) => next(err));
});

module.exports = router;
