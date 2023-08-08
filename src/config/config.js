const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

const connectDatabase = async () => {
  try {
    await mongoose.connect("mongodb+srv://qrscanner:qrscanner@atlascluster.oi9lb7x.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB");
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
