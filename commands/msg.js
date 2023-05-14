"use strict";

const config = require("./../config.json");

exports.run = (client, message, args) => {
    if (message.author.id === config.ownerID) {
        let sendTo = args[0];
        let sMessage = args.splice(1);
        client.users.get(sendTo).send(`${sMessage}`);
    } else {
        // Else do nothing
    }
};
