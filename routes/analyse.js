const express = require("express");
const router = express.Router();
const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");

function findFileRecursive(dir, targetName) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const result = findFileRecursive(fullPath, targetName);
      if (result) return result;
    } else if (file === targetName) {
      return fullPath;
    }
  }

  return null;
}

router.post("/", (req, res) => {
  try {
    const zipPath = req.file.path;

    // Create unique extraction folder
    const extractPath = path.join("temp", Date.now().toString());
    fs.mkdirSync(extractPath, { recursive: true });

    // Extract ZIP
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractPath, true);

    // Find required JSON files
    const followersPath = findFileRecursive(
      extractPath,
      "followers_1.json"
    );

    const followingPath = findFileRecursive(
      extractPath,
      "following.json"
    );

    if (!followersPath || !followingPath) {
      return res.status(400).json({
        error: "Required Instagram JSON files not found in ZIP"
      });
    }

    // Send back paths (test)
    res.json({
      message: "Files found",
      followersPath,
      followingPath
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "ZIP extraction failed" });
  }
});

module.exports = router;
