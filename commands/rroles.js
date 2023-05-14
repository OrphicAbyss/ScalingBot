"use strict";

exports.run = (client, message, args, sql) => {
    sql.all(`SELECT roleName, level FROM levelRoles WHERE guildID = '${message.guild.id}' ORDER BY level ASC`).then(rRow => {

    });
};
