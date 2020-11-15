const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
/* Here we'll write the routes for the rooms */

//1. to retrieve rooms from mongo and make available to frontend
router.get("/rooms", (req, res, next) => {
  console.log("Rooms", req.body);
  Room.find({}).then((result) => {
    res.send({ rooms: result });
  });
});

router.get("/rooms/:id", (req, res) => {
  Room.findById(req.params.id).then((room) => {
    res.json(room);
    console.log("This is the room", room);
  });
});

//post new room in Berlin
router.post("/addRoom", (req, res) => {
  //2.get the data from frontend
  const {
    name,
    district,
    description,
    price,
    postcode,
    address,
    phoneNumber,
    email,
    neighbourhood,
    owner,
  } = req.body;
  console.log("BACKEND", req.body);
  //3. then create a new room with information from the frontend
  req.user;
  Room.create({
    name: name,
    district: district,
    postcode: postcode,
    address: address,
    phoneNumber: phoneNumber,
    email: email,
    neighbourhood: neighbourhood,
    description: description,
    price: price,
    owner: owner,
  })
    .then((newRoom) => {
      console.log("whats name?");
      console.log("NEWROOM", newRoom);
      res.json(newRoom);
    })
    .catch((err) => {
      res.status(500).json({
        messgae: "Error",
      });
    });
});
router.patch("/updateroom/:roomId", (req, res) => {
  const { roomId } = req.params;
  console.log(roomId);
  console.log(req.body);
  const { secureUrl } = req.body;
  Room.findByIdAndUpdate(
    roomId,
    { $push: { images: { secureUrl } } },
    { safe: true, upsert: true, new: true },
    function (err, model) {
      console.log(err);
    }
  );
});
//delete room from list
router.delete("/rooms/:id/delete", (req, res) => {
  //console.log('whats req?', req.params.id);
  Room.deleteOne({ _id: req.params.id })
    .then((result) => {
      //console.log('RESULT', result);
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: "Error" });
    });
});

module.exports = router;
