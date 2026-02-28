const mongoose = require("mongoose");
const { MONGO_URI } = require("./env.config");

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
