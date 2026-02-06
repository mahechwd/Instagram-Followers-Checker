const express = require("express");

const app = express();
const PORT = 3000;

// Serve frontend files
app.use(express.static("public"));

// Test route
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});