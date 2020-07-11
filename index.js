const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const memberRouter = require("./src/routes/member.js");

dotenv.config();
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

memberRouter(app);

// set port, listen for requests
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
