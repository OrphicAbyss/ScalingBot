"use strict";

module.exports.leaderboardEmbed = function (client, message, sql, Discord) {
    sql.all(`SELECT username, globalPoints, nextPL from userScores WHERE guildID='${message.guild.id}' ORDER BY globalPoints DESC LIMIT 5`).then(gLeader => {
        let leadOut = "Sorry there is no leaderboards yet. Start chatting!";
        if (!!gLeader[0]) {
            const lUser = gLeader.map(z => z.username);
            const lPoints = gLeader.map(y => y.globalPoints);
            const lNextP = gLeader.map(x => x.nextPL);

            const leadOutp = lUser.map(function (a, b) {
                let s = b + 1;
                return [s + ". " + a + " " + lPoints[b] + "/" + lNextP[b]];
            });
            leadOut = leadOutp.join("\n");
        }

        const embed = new Discord.RichEmbed()
            .setColor(0x00AE86)
            .setThumbnail(message.guild.iconURL)
            .addField(`Leaderboards for **${message.guild.name}**`, `${leadOut}`, true);
        message.channel.send({embed: embed});
    });

};
