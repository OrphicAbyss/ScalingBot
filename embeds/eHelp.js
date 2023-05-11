"use strict";

module.exports.helpEmbed = function (client, message, Discord) {
    var embed = new Discord.RichEmbed()
        .setTitle("ScaleBot")
        .setDescription("List of commands for ScaleBot.")
        .setColor(0x00AE86)
        .setThumbnail(client.user.displayAvatarURL)
        .addField("Commands", `**:?leaderboard**
**:?rank**
**:?rank** \`\`@User\`\`
**:?help**
**:?help** \`\`COMMAND\`\`
**:?invite**
**:?rlevel** \`\`add/remove rolename\`\`
**:?bug** \`\`bug information\`\`
**:?blacklist** \`\`add/remove rolename\`\`
**:?support** \`\`need help? join now!\`\``, true)
        .setFooter("© Litochee#5162", `${client.user.displayAvatarURL}`);
    message.channel.send({embed: embed});
};
