"use strict";

const Discord = require("discord.js");

module.exports.spHEmbed = function (client, message, spCmd) {
    const embed = new Discord.RichEmbed()
        .setTitle(spCmd.command)
        .setDescription(spCmd.description)
        .setColor(0x00AE86);
    message.channel.send({embed: embed});
};
