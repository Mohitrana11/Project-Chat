const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/.env" });

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const cors = require("cors");
app.use(cors());

const morgan = require("morgan");
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Some Data is here");
});

// User Routers:
const userRoutes = require("./routers/userRoutes");
app.use("/api/v1/user", userRoutes);

// Message Router:
const messageRouter = require("./routers/message");
app.use("/api/v1/message", messageRouter);

// Chat Routes:
const chatRoutes = require("./routers/chatRouters");
app.use("/api/v1/chats", chatRoutes);

// Search Routes
// const searchRouter = require("./routers/searchUser");
// app.use("/api/v1/search", searchRouter);

const errorMiddleware = require("./middlewares/error");
app.use(errorMiddleware);

module.exports = app;
