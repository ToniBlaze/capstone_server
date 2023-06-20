const mongoose = require("mongoose");

// Mongoose Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  city: { type: String, required: true },
  age: {
    type: Number,
    required: true,
  },
  email: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
});


// Mongoose Model
const userModel = mongoose.model("Users", userSchema);

// Export Module
module.exports = userModel;
