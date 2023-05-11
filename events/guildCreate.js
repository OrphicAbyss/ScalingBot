"use strict";

const config = require("./../config.json");

exports.run = (client, member, sql) => {
    client.users.get(config.ownerID).send(`Amari has been added to a server.`);
};
