const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://Phani:Phani3385@cluster0.kzblpva.mongodb.net/test?retryWrites=true&w=majority");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
    throw new Error("Unable to connect to the database");
  }
};

module.exports = { connect };
