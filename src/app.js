const path = require("path");
const express = require("express");

const postRouter = require("./routes/postRoutes");

const app = express();

// Middleware to serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Middleware to parse JSON request bodies
app.use(express.json());

// Define routes

app.use("/", postRouter);

module.exports = app;
