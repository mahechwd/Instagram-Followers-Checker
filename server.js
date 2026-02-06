const express = require("express");
const multer = require("multer");
const analyzeRoute = require("./routes/analyze");

const app = express();
const PORT = 3000;

const upload = multer({
  dest: "uploads/",
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/zip") {
      cb(null, true);
    } else {
      cb(new Error("Only ZIP files allowed"));
    }
  }
});

app.use(express.static("public"));

app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});


app.use("/api/analyze", upload.single("zip"), analyzeRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
