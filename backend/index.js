const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const routes = require("./routes");
const db = require("./db");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Initialize routes
app.use('/', routes);

// Connect to the database
db.connect()
  .then(() => {
    app.listen(3015, () => {
      console.log("Node API app is running on port 3015");
    });
  })
  .catch((err) => {
    console.log(err);
  });
