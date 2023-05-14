"use strict";

const isStaff = require("../functions/isStaff");

exports.run = (client, message, args, database) => {
    if (isStaff(message)) {
        const rMember = message.guild.member(message.mentions.users.first());
        if (!rMember) {
            message.reply("Please choose a member to by @'ing them. example: :?reset @user");
        } else {
            database.reset(message.guild, rMember);
            message.reply(`${rMember.user.username} has been reset.`);
        }
    }
};
