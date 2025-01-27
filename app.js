"use strict";

const fs = require("fs");

const Discord = require("discord.js");
const sql = require("sqlite");
const config = require("./config.json");
const levelerCore = require("./functions/levelSystem");

const client = new Discord.Client();
const talkedRecently = new Set();

sql.open(`./db/mainDB.sqlite`);

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        client.on(eventName, (...args) => eventFunction.run(client, ...args, sql));
    });
});

client.on("message", message => {
    //ignores bots
    if (message.author.bot) return;

    // checks if the user is typing a command
    if (!!message.content.startsWith(config.prefix)) {//user IS typing a command
        //splits input to commands
        let command = message.content.split(" ")[0];
        command = command.slice(config.prefix.length);

        let args = message.content.split(" ").slice(1); //passing through the argument content

        try {
            let commandFile = require(`./commands/${command}.js`);
            commandFile.run(client, message, args, sql, Discord);
        } catch (err) {
            console.log(err);
            client.users.get(config.ownerID).send(`${err}`);
        }
    } else {// user is NOT typing a command
        if (message.channel.type === "dm") {
            client.users.get(config.ownerID).send(`${message.author.id}, ${message.author.username}: ${message.content}`);
        } else {
            // check that the user isn't in a blacklisted role
            sql.all(`SELECT roleName FROM bListRoles WHERE guildID=${message.guild.id}`).then(rCheck => {
                const blRoles = rCheck.map(g => g.roleName);
                if (!message.member.roles.some(r => blRoles.includes(r.name))) {
                    // check if they are talking too fast (spam)
                    if (!talkedRecently.has(message.author.id)) {
                        levelerCore.scoreSystem(client, message, sql, Discord);
                        talkedRecently.add(message.author.id);
                        // Removes the user from the set after 4 seconds
                        setTimeout(() => {
                            talkedRecently.delete(message.author.id);
                        }, 4 * 1000);
                    }
                }
            });
        }
    }
});

client.login(config.token);
