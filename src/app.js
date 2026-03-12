require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const submissionRoutes = require("./routes/submissionRoutes");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://talent-hunt-frontend-black.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: false,
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
