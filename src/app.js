const express = require("express");
const cors = require("cors");

const articleRoutes = require("./routes/article.routes");
const errorHandler = require("./middlewares/error.middleware");

const app = express();

/**
 * Global Middlewares
 */
app.use(cors({
  origin: "*", // 🔒 restrict this in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/**
 * Health check (important for Render)
 */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/**
 * API Routes
 */
app.use("/api/articles", articleRoutes);

/**
 * Global Error Handler
 */
app.use(errorHandler);

module.exports = app;
