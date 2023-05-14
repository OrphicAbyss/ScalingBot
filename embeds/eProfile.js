"use strict";

const Discord = require("discord.js");

module.exports.profileEmbed = function (client, message, user, iUser) {
    const embed = new Discord.RichEmbed()
        .setTitle(iUser.username)
        .setDescription(`**Level:** ${iUser.rank} \n**Exp:** ${iUser.globalPoints} / ${iUser.rankPoints}\n**Rank:** ${iUser.globalRank}`)
        .setColor(0x00AE86)
        .setThumbnail(user.displayAvatarURL);

    message.channel.send({embed: embed});

};
