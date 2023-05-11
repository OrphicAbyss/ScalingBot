"use strict";

exports.run = (client, message, args, sql, Discord) => {
    sql.all(`SELECT roleName, level FROM levelRoles WHERE guildID = '${message.guild.id}' ORDER BY level ASC`).then(rRow => {
        let rlOut = "None";
        if (!!rRow[0]) {
            const rlName = rRow.map(z => z.roleName);
            const rlLevel = rRow.map(x => x.level);
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
    });
};
