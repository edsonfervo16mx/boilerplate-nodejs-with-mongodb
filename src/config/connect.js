require("dotenv").config();
const mongoose = require("mongoose");

const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(process.env.MONGODB_URL, options)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`Error: ${err.message}`));
