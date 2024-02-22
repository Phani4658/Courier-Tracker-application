const mongoose = require("mongoose");
require('dotenv').config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
    throw new Error("Unable to connect to the database");
  }
};

module.exports = { connect };
