const express = require("express");
const app = express();
const { sequelize, testConnection } = require("./db/index");
const searchRoutes = require("./routes/search");
require("dotenv").config();

app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Restaurant Search API is running! Use /search endpoint to query dishes.");
});

// Routes
app.use("/search", searchRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await testConnection();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
