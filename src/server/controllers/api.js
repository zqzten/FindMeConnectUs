const bcrypt = require('bcryptjs');

const APIError = require('../rest').APIError;
const util = require('../util');

module.exports = {
    'POST /api/user/register': async (ctx, next) => {
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;
        const avatarID = ctx.request.body.avatarID;
        const modelID = ctx.request.body.modelID;
        const signature = ctx.request.body.signature;

        // check if the request is valid
        if (!(username && password && avatarID && modelID && signature)) throw new APIError('request_invalid');

        // check if username existed
        const oldUser = await util.getUserByName(username);
        if (oldUser) throw new APIError('username_existed');

        // create user
        const user = {
            username: username,
            password: bcrypt.hashSync(password),
            avatarID: avatarID,
            modelID: modelID,
            signature: signature,
            createdAt: Date.now()
        };
        await util.createUser(user);

        ctx.rest({});

        await next();
    },
    'POST /api/user/login': async (ctx, next) => {
        const username = ctx.request.body.username;
        const password = ctx.request.body.password;

        // check if the request is valid
        if (!(username && password)) throw new APIError('request_invalid');

        // validate username
        const user = await util.getUserByName(username);
        if (!user) throw new APIError('user_not_exist');

        // validate password
        if (!bcrypt.compareSync(password, user.password)) throw new APIError('password_mismatch');

        // set session
        ctx.session.user = user.id;

        ctx.rest({});

        await next();
    },
    'POST /api/user/logout': async (ctx, next) => {
        // unset session
        ctx.session.user = null;

        ctx.rest({});

        await next();
    },
    'POST /api/user/password/modify': async (ctx, next) => {
        const userID = ctx.session.user;

        // check if session is invalid
        if (!userID) throw new APIError('session_invalid');

        const oldPassword = ctx.request.body.oldPassword;
        const newPassword = ctx.request.body.newPassword;

        // check if the request is valid
        if (!(oldPassword && newPassword)) throw new APIError('request_invalid');

        // validate password
        let user = await util.getUserByID(userID);
        if (!bcrypt.compareSync(oldPassword, user.password)) throw new APIError('password_mismatch');

        // modify password
        user.password = bcrypt.hashSync(newPassword);

        ctx.rest({});

        await next();
    },
    'GET /api/user/info': async (ctx, next) => {
        let userID = ctx.request.query.id;
        if (!userID) {
            userID = ctx.session.user;
            // check if session is invalid
            if (!userID) throw new APIError('session_invalid');
        }

        // get user info
        const user = await util.getUserByID(userID);
        const gameCount = await util.getUserGameCount(userID);

        ctx.rest({
            id: user.id,
            username: user.username,
            avatarID: user.avatarID,
            modelID: user.modelID,
            signature: user.signature,
            createdAt: user.createdAt,
            gameCount: gameCount
        });

        await next();
    },
    'POST /api/user/modify': async (ctx, next) => {
        const userID = ctx.session.user;

        // check if session is invalid
        if (!userID) throw new APIError('session_invalid');

        const avatarID = ctx.request.body.avatarID;
        const modelID = ctx.request.body.modelID;
        const signature = ctx.request.body.signature;

        // modify user info
        let user = await util.getUserByID(userID);
        if (avatarID) user.avatarID = avatarID;
        if (modelID) user.modelID = modelID;
        if (signature) user.signature = signature;
        await user.save();

        ctx.rest({});

        await next();
    },
    'GET /api/user/records': async (ctx, next) => {
        const userID = ctx.session.user;

        // check if session is invalid
        if (!userID) throw new APIError('session_invalid');

        // get records
        let results = [];
        const records = await util.getUserGameRecords(userID);
        for (const record of records) {
            const game = await util.getGame(record.gameID);
            results.push({
                gameID: record.gameID,
                state: record.state,
                score: record.score,
                mapLength: game.mapLength,
                mapWidth: game.mapWidth,
                time: game.createdAt
            });
        }

        ctx.rest(results);

        await next();
    }
};
