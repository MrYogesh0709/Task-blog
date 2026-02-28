const express = require("express");
const { blogRoutes, authRoutes } = require("./routes/index.route");
const { errorHandler } = require("./error/ApiError");
const { notFound } = require("./error/notFound");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => res.json("healthy"));

//all routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blog", blogRoutes);

app.use(errorHandler);
app.use(notFound);

module.exports = app;
