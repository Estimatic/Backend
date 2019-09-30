const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");

const helmet = require("helmet");
const mongoose = require("mongoose");
const { authenticate } = require("./auth/tokenHandlers.js");

const server = express();

// routers
const userRouter = require("./routers/userRouter.js");
const authRouter = require("./routers/authRouter.js");
const companyRouter = require("./routers/companyRouter.js");
const invitationRouter = require("./routers/invitationRouter.js");
const customerRouter = require("./routers/customerRouter.js");

// middleware
server.use(json());
server.use(cors());

server.use(urlencoded({ extended: true }));
server.use(morgan("dev"));
server.use(helmet());

// route hookup
server.use("/api/users", authenticate, userRouter);
server.use("/api/auth", authRouter);
server.use("/api/company", companyRouter);
server.use("/api/invitation", invitationRouter);
server.use("/api/customers", customerRouter);

server.get("/", (req, res) => {
  res.send("working");
});

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
