"use strict";

const isStaff = require("../functions/isStaff");

exports.run = async (client, message, args, database) => {
    if (isStaff(message)) {
        let condition = args[0];
        let pRole = args.splice(1);
        switch (condition) {
            case "add":
                const bRole = message.guild.roles.find("name", pRole.join(" "));
                if (!bRole) {
                    message.reply(`No role found ${pRole.join(" ")}. Remember it is case sensitive.`);
                } else {
                    await database.addBlacklistedRole(message.guild, bRole);
                    message.reply(`${pRole.join(" ")} has been added to the points system blacklist.`);
                }
                break;
            case "remove":
                const cRole = message.guild.roles.find("name", pRole.join(" "));
                if (!cRole) {
                    message.reply(`No role found ${pRole.join(" ")}. Remember it is case sensitive.`);
                } else {
                    await database.removeBlacklistedRole(guild, cRole);
                    message.reply(`${cRole.name} has been removed from the blacklist.`);
                }
                break;
            default:
                message.reply("Please use the conditions add or remove.");
                break;
        }
    }
};
