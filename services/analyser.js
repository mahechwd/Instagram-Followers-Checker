const fs = require("fs");

function extractUsernames(filepath) {
  const raw = fs.readFileSync(filepath, "utf-8");
  const data = JSON.parse(raw);

  const usernames = new Set();

  data.forEach(entry => {
    if (
      entry.string_list_data &&
      entry.string_list_data[0] &&
      entry.string_list_data[0].value
    ) {
      usernames.add(entry.string_list_data[0].value);
    }
  });

  return usernames;
}

function analyseFollowers(followersPath, followingPath) {
  const followers = extractUsernames(followersPath);
  const following = extractUsernames(followingPath);

  const dontFollowBack = [...following].filter(x => !followers.has(x));
  const notFollowedBack = [...followers].filter(x => !following.has(x));

  return { dontFollowBack, notFollowedBack };
}

module.exports = { analyseFollowers };
