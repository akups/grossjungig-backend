const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User");
/* Here we'll write the routes dedicated to handle the user logic (auth) */
//2.

router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  const isFound = await User.findOne({ email: email });

  if (isFound) {
    return res.status(400).json({ message: "This email already exists" });
  } else {
    // single responsability principle

    try {
      const hash = await bcrypt.genSalt().then((salt) => {
        return bcrypt.hash(password, salt);
      });

      const newUser = await User.create({
        name: name,
        role: role,
        email: email,
        password: hash,
      });

      // sendign response
      req.login(newUser, (err) => {
        if (err) {
          console.log("error login", err);
          res.status(500).json({ message: "Error while logging in" });
        } else {
          console.log("sending back the user");
          res.json({
            id: newUser.id,
          });
        }
      });
    } catch (e) {
      console.log(error);
    }
  }
});

//3)
router.post("/login", (req, res, next) => {
  console.log("backenduser", req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Error while logging in" });
    }
    if (!user) {
      // no user found with username or password didn't match
      return res.status(400).json({ message: info.message });
    }
    // passport req.login
    req.login(user, (err) => {
      console.log("USER???????", user);

      if (err) {
        return res.status(500).json({ message: "Error while logging in" });
      }
      req.user = user; //setting user to be the requested user
      res.json(user);
    });
  })(req, res, next);
});

router.delete("/logout", (req, res) => {
  // passport logout function
  req.logout();
  res.json({ message: "Successful logout" });
});

router.get("/loggedin", (req, res) => {
  console.log("USER LOGGED IN", req.user);
  // if (req.user) {
  res.json(req.user);
  // }
  // else {
  //   res.json(null);
  // }
});

module.exports = router;
