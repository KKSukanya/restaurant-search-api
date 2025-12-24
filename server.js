const express = require("express");
const app = express();
const { sequelize, testConnection } = require("./db/index"); // import from index
const searchRoutes = require("./routes/search");
require("dotenv").config();

app.use(express.json());

// Routes
app.use("/search", searchRoutes);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await testConnection();  // test DB connection
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
