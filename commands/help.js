"use strict";

const hEmbed = require("./../embeds/eHelp.js");
const eCEmbed = require("./../embeds/eCHelp.js");

exports.run = (client, message, args) => {
    const cHelp = {
        command: "help",
        description: "In this command you can see all the of the commands and you can see specific information about a command by doing ``:?help rank``"
    };
    const cRank = {
        command: "rank",
        description: "With rank you can see what your rank in the leaderboards are. You can also see other peoples rank with ``:?rank @user``"
    };
    const cBug = {
        command: "bug",
        description: "If you find a bug please report it with the ``:?bug <insert issue here.>`` command."
    };
    const cLeaderboard = {
        command: "leaderboard",
        description: "View the leaderboards for your current server and see who is top!"
    };
    const crLevel = {
        command: "rlevel",
        description: "Add/Remove roles that users gain at a certain level. Make sure that there is a role named **Staff** (only people with this role can add roles).\n\nTo **add** a role use: \`\`:?rlevel add level RoleName\`\` \nTo **remove** a role use: \`\`:?rlevel remove RoleName\`\`"
    };
    const pBlackList = {
        command: "blacklist",
        description: "Add/Remove blacklists on roles (stops users in certain roles from getting points), if user has a certain role that is added to the blacklist they won't get exp. Example: ``:?blacklist add Developer``. People with the ``Developer`` role will NOT get points."
    };

    let mHelp = args[0];
    switch (mHelp) {
        case "leaderboard":
            eCEmbed.spHEmbed(client, message, cLeaderboard);
            break;
        case "help":
            eCEmbed.spHEmbed(client, message, cHelp);
            break;
        case "rank":
            eCEmbed.spHEmbed(client, message, cRank);
            break;
        case "bug":
            eCEmbed.spHEmbed(client, message, cBug);
            break;
        case "rlevel":
            eCEmbed.spHEmbed(client, message, crLevel);
            break;
        case "blacklist":
            eCEmbed.spHEmbed(client, message, pBlackList);
            break;
        default:
            hEmbed.helpEmbed(client, message);
            break;
    }
};
