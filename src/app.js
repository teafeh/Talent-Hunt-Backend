require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const submissionRoutes = require("./routes/submissionRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

app.use(limiter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Talent Hunt API is running",
  });
});

app.use("/api/submissions", submissionRoutes);

app.use((err, req, res, next) => {
  console.error("Server error:", err);

  res.status(500).json({
    success: false,
    message: "Something went wrong on the server.",
  });
});

module.exports = app;
