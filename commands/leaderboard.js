"use strict";

const lEmbed = require("./../embeds/eLeaderboard.js");

exports.run = async (client, message, args, database) => {
    const leaders = await database.getLeaderBoard();
    lEmbed.leaderboardEmbed(client, message, leaders);
};
