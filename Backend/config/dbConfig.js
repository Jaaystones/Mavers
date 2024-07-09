const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');


const mongoDb = asyncHandler(async () => {
    try {
      const connection = await mongoose.connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`Connected to Database!! ${connection.connection.host}`);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  });

module.exports = mongoDb 