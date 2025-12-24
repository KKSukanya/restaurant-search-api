const express = require("express");
const app = express();
require("dotenv").config();

const { testConnection } = require("./db/index");
const searchRoutes = require("./routes/search");

app.use(express.json());

// Routes
app.use("/search", searchRoutes);

// IMPORTANT: Railway-compatible PORT handling
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", async () => {
  await testConnection();
  console.log(`Server running on port ${PORT}`);
});
