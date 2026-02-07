const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const AdmZip = require("adm-zip");
const fs = require("fs");
const path = require("path");
const { analyseFollowers } = require("../services/analyser");

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

router.post("/", async (req, res) => {
  try {
    const zipPath = req.file.path;

    // Create unique temp folder
    const extractPath = path.join(
      "temp",
      Date.now().toString()
    );
    fs.mkdirSync(extractPath, { recursive: true });

    // Extract ZIP
    const zip = new AdmZip(zipPath);
    zip.extractAllTo(extractPath, true);

    // Find required files
    const followersPath = findFileRecursive(
      extractPath,
      "followers_1.json"
    );
    const followingPath = findFileRecursive(
      extractPath,
      "following.json"
    );

    if (!followersPath || !followingPath) {
      return res
        .status(400)
        .json({ error: "Required JSON files not found in ZIP" });
    }

    const results = analyseFollowers(
      followersPath,
      followingPath
    );

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "ZIP processing failed" });
  }
=======

router.post("/", (req, res) => {
  res.json({ message: "Analyze route working!" });
>>>>>>> 93c50ff
});

module.exports = router;
