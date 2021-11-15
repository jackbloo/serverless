const mongoose = require('mongoose');
let isConnected = null;

module.exports = connectToDatabase = async() => {
  if (!isConnected) {
    isConnected = await mongoose.connect(process.env.DB,{ family: 6 })
    console.log('MongoDB is Connected')
  }


};