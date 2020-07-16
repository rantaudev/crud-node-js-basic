const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const app = express();

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(require("./router.js"));

// set port, listen for requests
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
