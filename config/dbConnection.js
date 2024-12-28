const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("Connected to MongoDB", connect.connection.host);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
module.exports = connectDB;
