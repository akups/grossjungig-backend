require("dotenv").config();

require("./db"); // will run the code in `./db/index.js` (which is the database connection logic)

// const nodemailer = require("nodemailer");
const express = require("express");
const fileUpload = require("express-fileupload");
const logger = require("morgan");
const app = express();
const cors = require("cors");
const pkg = require("./package.json");

require("./passport")(app);
app.use(fileUpload());
// app.use(nodemailer);

app.use(express.urlencoded({ extended: true })); // sets the `body` object in the `request` with the values from an HTML POST form

app.use(express.json()); // sets the `body` object in the `request` with the data coming from a request with a `body` (request we'll issue with axios, fetch...)

app.use(logger("dev")); // this middleware will log every response that is issued (with the status code) in the console

app.set("pkg", pkg);
const { name, author, description } = app.get("pkg");
app.get("/", (req, res) => res.json({ name, author, description }));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://grossjungig.vercel.app",
      "https://grossjungig.de", // adding the grossjungig.de to ensure CORS doesn't restrict it
    ],
    credentials: true,
  })
);

const routes = require("./routes"); // this is our controller and will manage all the routes so we don't have to register any new route handler here
app.use(routes);

// app.use((req, res) => {
//   res.sendFile(__dirname + "/public/index.html"); // 1. this will be added as part of deployment process in order to allow people to view from any server
// });

app.listen(process.env.PORT, () => {
  console.log(
    `Express server listening in http://localhost:${process.env.PORT}`
  );
});
