"use strict";

const config = require("./../config.json");

exports.run = (client, member, sql) => {
    client.users.get(config.ownerID).send(`ScaleBot has been removed from a server...`);
};
