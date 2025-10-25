const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI,)
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((error) => {
      console.log("Mongo URI:", process.env.MONGO_URI)
      console.log(`MongoDB connection: ${error} `);
    });
};

module.exports = connectDB;
