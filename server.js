const express = require("express");
const multer = require("multer");
const analyseRoute = require("./routes/analyse");

const app = express();
const PORT = process.env.PORT || 3000;

// Configure upload middleware
const upload = multer({ dest: "uploads/" });

// Serve frontend files
app.use(express.static("public"));

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Analyse ZIP route
app.use("/api/analyse", upload.single("zip"), analyseRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
