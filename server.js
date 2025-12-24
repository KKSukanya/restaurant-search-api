const express = require("express");
const app = express();
const { testConnection } = require("./db/index");
const searchRoutes = require("./routes/search");
require("dotenv").config();

app.use(express.json());

// Routes
app.use("/search", searchRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await testConnection();
  console.log(`Server running on http://localhost:${PORT}`);
});
