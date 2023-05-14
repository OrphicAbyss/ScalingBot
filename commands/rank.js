"use strict";

const pEmbed = require("./../embeds/eProfile.js");

exports.run = async (client, message, args, database) => {
    const member = message.guild.member(message.mentions.users.first());
    const noPoints = !message ? "Sorry you don't have any points."
        : `Sorry ${member.username} doesn't have any points.`

    const user = await database.getUser(message.guild, member || message.author);
    if (!user) {
        message.reply(noPoints);
    } else {
        database.calculateRank(user);
        await database.calculatePostion(user);

        pEmbed.profileEmbed(client, message, message.author, user);
    }
};
