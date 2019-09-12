const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");

const server = express();

server.use(json());
server.use(urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(helmet());

const port = process.env.PORT || 5000;

const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/estimatic-local", {
    useNewUrlParser: true,
    // remember to check out what the below line is about, server gave warning
    useUnifiedTopology: true
  });
};

connect()
  .then(conn => {
    server.listen(port, () => {
      console.log(`server listening on port:${port}`);
    });
  })
  .catch(err => {
    console.error("error connection to database: ", err);
  });
