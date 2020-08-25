const mongoose = require("mongoose");
const config = require("../config");

mongoose
  .connect(config.database, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then((db) => console.log("db is connected"));
