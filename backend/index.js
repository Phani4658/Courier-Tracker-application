const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const trackingRoutes = require('./routes/trackingRoutes');
const db = require("./db");
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Initialize routes
app.use('/',authRoutes)
app.use('/', adminRoutes);
app.use('/', trackingRoutes);

// Connect to the database
db.connect()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Node API app is running on port 3015");
    });
  })
  .catch((err) => {
    console.log(err);
  });
