"use strict";

const fs = require("fs");

const Discord = require("discord.js");
const sql = require("sqlite");
const config = require("./config.json");
const Database = require("./db/database");
const levelUpEmbed = require("./embeds/eLevelUp").levelUpEmbed;

const client = new Discord.Client();
const talkedRecently = new Set();

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";
const db = new Database(uri);
db.connect()
    .then(() => db.initialise());

sql.open(`./db/mainDB.sqlite`);

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        let eventFunction = require(`./events/${file}`);
        let eventName = file.split(".")[0];

        client.on(eventName, (...args) => eventFunction.run(client, ...args, sql));
    });
});

client.on("message", async message => {
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
            if (!await db.isBlacklisted(message.guild, message.author)) {
                // check if they are talking too fast (spam)
                if (!talkedRecently.has(message.author.id)) {
                    const userScore = await db.updateScore(message.guild, message.author);
                    if (db.userLevelledUp(userScore)) {
                        levelUpEmbed(client, message, userScore.rank);
                    }
                    talkedRecently.add(message.author.id);
                    // Removes the user from the set after 4 seconds
                    setTimeout(() => {
                        talkedRecently.delete(message.author.id);
                    }, 4 * 1000);
                }
            }
        }
    }
});

client.login(config.token);
