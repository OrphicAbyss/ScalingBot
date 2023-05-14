"use strict";

const isStaff = require("../functions/isStaff");

exports.run = (client, message, args) => {
    if (isStaff(message)) {
        client.user.setActivity(args.join(" "), { type: "LISTENING" });
    }
};
