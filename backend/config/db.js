const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

module.exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the DB successfully');
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
