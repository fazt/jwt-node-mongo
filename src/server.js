const express = require("express");
const morgan = require("morgan");
const config = require("./config");

const app = express();

// settings
app.set("port", config.port);
app.set("superSecret", config.secret);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use(require("./routes"));
app.use(require("./routes/users"));
app.use(require("./routes/auth"));

module.exports = app;
