const express = require("express");
const router = express.Router();
const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");

router.post("/", (req, res) => {
  try {
    const zipPath = req.file.path;

    // Create unique extraction folder
    const extractPath = path.join("temp", Date.now().toString());
    fs.mkdirSync(extractPath, { recursive: true });

    // Extract ZIP
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractPath, true);

    res.json({
      message: "ZIP extracted successfully",
      extractPath
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ZIP extraction failed" });
  }
});

module.exports = router;
