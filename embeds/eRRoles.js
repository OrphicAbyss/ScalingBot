"use strict";

const Discord = require("discord.js");

module.exports.rolesEmbed = function (client, message, roles) {
    let rlOut = "None";
    if (!!rRow[0]) {
        const rlName = roles.map(z => z.roleName);
        const rlLevel = roles.map(x => x.level);
        const rlOutp = rlLevel.map(function (a, b) {
            return ["L: " + `**${a}**` + "  N: " + `**${rlName[b]}**`];
        });
        rlOut = rlOutp.join("\n");
    }

    const embed = new Discord.RichEmbed()
        .setTitle("ScaleBot Settings")
        .setDescription(`**Roles for ${message.guild.name} server**`)
        .setColor(0x00AE86)
        .setThumbnail(message.guild.iconURL)
        .addField("Roles", `${rlOut}`, false);

    message.channel.send({embed: embed});
};
