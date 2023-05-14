"use strict";

const {MongoClient} = require("mongodb");

class Database {
    constructor (uri) {
        this.uri = uri;
        this.client = null;
    }

    async connect () {
        this.client = new MongoClient(this.uri);
        await this.client.connect();

        // get our database
        this.database = await this.client.db("leveling_bot");

        // get the collections
        this.configCol = this.database.collection("config");
        this.userScores = this.database.collection("user_scores");
        this.blacklistRole = this.database.collection("blacklist_roles");

        // get config
        this.config = await this.getConfig();
    }

    disconnect () {
        if (this.client) {
            this.client.close();
        } else {
            console.error("Trying to close unopened database");
        }
    }

    initialise () {
        // add indices to the config version
        this.configCol.createIndex({version: 1}, {background: true});
        // add indices to the collection to hold the scores
        // index to allow quick find of user
        this.userScores.createIndex({guildId: 1, userId: 1}, {background: true});
        // index to allow quick find of rank
        this.userScores.createIndex({guildId: 1, globalPoints: 1}, {background: true});
        // add indices to the collection that holds blacklisted roles that don't get levels
        // index to find a role
        this.blacklistRole.createIndex({guildId: 1, roleId: 1}, {background: true});
    }

    async getConfig () {
        const configRows = await this.configCol.find({}).sort({version: -1}).limit(1).toArray();

        if (configRows.length > 0) {
            return configRows[0];
        } else {
            const config = {
                version: 0,
                levelPoints: 50,
                levelScale: 1.5
            };
            await this.setConfig(config);
            return config;
        }
    }

    async setConfig (config) {
        config.version += 1;
        this.configCol.insert(config);
    }

    async getUser (guild, member) {
        const guildId = guild.id;
        const userId = member.id;

        let userScore;

        try {
            userScore = await this.userScores.findOne({guildId: guildId, userId: userId});
        } catch (e) {
            userScore = {
                guildID: guildId,
                userID: userId,
                username: member.username,
                globalPoints: 0
            };
        }

        return userScore;
    }

    calculateRank (userScore) {
        // check level up
        const levelPoints = this.config.levelPoints;
        const levelScale = this.config.levelScore;

        let rank = 1;
        let rankPoints = levelPoints;
        while (userScore.globalPoints < rankPoints) {
            rank++;
            rankPoints += rankPoints * levelScale;
        }
        userScore.rank = rank;
        userScore.rankPoints = rankPoints;
    }

    async calculatePostion (userScore) {
        const guildId = userScore.guildId;
        const globalPoints = userScore.globalPoints;

        userScore.globalRank = await this.userScores.count({guildId: guildId, globalPoints: {$gt: globalPoints}});
    }

    async resetUser (guild, member) {
        const guildId = guild.id;
        const userId = member.id;

        const record = {
            guildID: guildId,
            userID: userId,
            username: member.username,
            globalPoints: 0
        };

        await this.userScores.findOneAndReplace({guildId: guildId, userId: userId}, record);
    }

    async addBlacklistedRole (guild, role) {
        const guildId = guild.id;
        const roleId = role.id;
        const roleName = role.name;

        await this.blacklistRole.insert({guildId: guildId, roleId: roleId, roleName: roleName});
    }

    async removeBlacklistedRole (guild, role) {
        const guildId = guild.id;
        const roleId = role.id;

        await this.blacklistRole.remove({guildId: guildId, roleId: roleId});
    }

    async isBlacklisted (guild, member) {
        const guildId = guild.id;
        const roles = member.roles;

        const foundRoles = this.blacklistRole.find({guildId: guildId, roleId: {$in: roles}});

        return foundRoles.count > 0;
    }

    async updateScore (guild, member) {
        const guildId = guild.id;
        const userId = member.id;

        let userScore = await this.getUser(guild, member);

        // update in cause of username update
        userScore.username = member.username;
        userScore.globalPoints += 1;

        await this.userScores.findOneAndReplace({guildId: guildId, userId: userId}, userScore);

        return userScore;
    }

    userLevelledUp (userScore) {
        this.calculateRank(userScore);

        return (userScore.globalPoints === rankPoints);
    }

    /**
     * Get the top 10 leaders
     *
     * @param guild
     */
    async getLeaderBoard (guild) {
        const guildId = guild.id;

        const leaders = await this.userScores.find({guildId: guildId}).sort({globalPoints: -1}).limit(10).toArray();
        leaders.forEach(user => this.calculateRank(user));

        return leaders;
    }
}

module.exports = Database;
