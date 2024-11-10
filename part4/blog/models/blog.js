require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

console.log("connecting to", url);

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })
