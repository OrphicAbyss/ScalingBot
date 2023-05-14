"use strict";

const Discord = require("discord.js");

module.exports.leaderboardEmbed = function (client, message, leaders) {
    let leadOut = "Sorry there is no leaderboards yet. Start chatting!";
    if (!!leaders[0]) {
        const lUser = leaders.map(u => u.username);
        const lPoints = leaders.map(u => u.globalPoints);
        const lNextP = leaders.map(u => u.rankPoints);
        const lRank = leaders.map(u => u.rank);

        const leadOutp = lUser.map(function (user, i) {
            let position = i + 1;
            return [position + ". " + user + " Level: " + lRank[i] + "Exp: " + lPoints[i] + "/" + lNextP[i]];
        });
        leadOut = leadOutp.join("\n");
    }

    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setThumbnail(message.guild.iconURL)
        .addField(`Leaderboards for **${message.guild.name}**`, `${leadOut}`, true);

    message.channel.send({embed: embed});
};
