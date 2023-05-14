"use strict";

module.exports = function (message) {
    const uAccess = message.guild.roles.find("name", "Staff");
    if (!uAccess) {
        message.reply("Please make a role named \"Staff\" and assign it to yourself to be able to use this command.");
    } else {
        if (message.member.roles.has(uAccess.id)) {
            return true;
        } else {
            message.reply("Sorry you don't have access to this command.");
        }
    }
    return false;
};
