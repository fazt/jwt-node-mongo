const { Schema, model } = require("mongoose");

const User = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  admin: Boolean,
});

module.exports = model("User", User);
