const fs = require("fs");

function extractFollowers(filepath) {
    const raw = fs.readFileSync(filepath, "utf-8");
    const data = JSON.parse(raw);

    if (!Array.isArray(data)) {
        throw new Error("Followers JSON should be an array");
    }

    const usernames = new Set();

    for (const entry of data) {
        if (
            entry.string_list_data &&
            entry.string_list_data.length > 0 &&
            entry.string_list_data[0].value
        ) {
            usernames.add(entry.string_list_data[0].value);
        }
    }

    console.log("Followers extracted:", usernames.size);
    return usernames;
}

function extractFollowing(filepath) {
    const raw = fs.readFileSync(filepath, "utf-8");
    const parsed = JSON.parse(raw);

    // following.json is wrapped inside an object
    const data = parsed.relationships_following;

    if (!Array.isArray(data)) {
        throw new Error("Following JSON structure invalid");
    }

    const usernames = new Set();

    for (const entry of data) {
        if (entry.title) {
            usernames.add(entry.title);
        }
    }

    console.log("Following extracted:", usernames.size);
    return usernames;
}

function analyseFollowers(followersPath, followingPath) {
    const followers = extractFollowers(followersPath);
    const following = extractFollowing(followingPath);

    const dontFollowBack = [...following].filter(
        u => !followers.has(u)
    );

    const notFollowedBack = [...followers].filter(
        u => !following.has(u)
    );

    return {
        dontFollowBack,
        notFollowedBack
    };
}

module.exports = { analyseFollowers };
