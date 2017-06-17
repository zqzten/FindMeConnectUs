const util = require("./util");

let chatSockets = new Map();

let roomSockets = new Map();
let roomUsers = new Map();
let rooms = new Map();

let gameSockets = new Map();
let gameUsers = new Map();
let games = new Map();

module.exports = io => {
    /* chat socket */
    let chatIO = io.of("/chat");
    chatIO.on("connection", socket => {
        /* user join chat */
        socket.on("join", userID => {
            chatSockets.set(socket.id, userID);
            chatIO.emit("joined", userID);
        });

        /* user send msg */
        socket.on("msg", msg => {
            const userID = chatSockets.get(socket.id);
            chatIO.emit("msg received", { userID: userID, msg: msg });
        });

        /* user offline */
        socket.on("disconnect", () => {
            const userID = chatSockets.get(socket.id);
            chatSockets.delete(socket.id);
            chatIO.emit("left", userID);
        });
    });

    /* room socket */
    let roomIO = io.of("/room");
    roomIO.on("connection", socket => {
        /* user online */
        socket.on("online", userID => {
            // map socket to user
            roomSockets.set(socket.id, userID);
        });

        /* user create room */
        socket.on("create", (roomName, mapLength, mapWidth, ack) => {
            const userID = roomSockets.get(socket.id);
            if (rooms.has(roomName)) {
                ack(false);
            } else {
                // create room
                rooms.set(roomName, { users: new Map([[userID, false]]), size: { mapLength: mapLength, mapWidth: mapWidth } });
                // join room
                roomUsers.set(userID, roomName);
                socket.join(roomName);
                ack(true);
            }
        });

        /* user join room */
        socket.on("join", (roomName, ack) => {
            const userID = roomSockets.get(socket.id);
            if (!rooms.has(roomName)) {
                ack(false, "room_not_exist");
            } else {
                let room = rooms.get(roomName);
                let users = room.users;
                // check if reach max limit
                if (users.size === 8) {
                    ack(false, "room_full");
                    return;
                }
                // notify others in room
                roomIO.to(roomName).emit("joined", userID);
                // notify self
                ack(true, [...users.entries()], room.size);
                // join room
                users.set(userID, false);
                roomUsers.set(userID, roomName);
                socket.join(roomName);
            }
        });

        /* user leave room */
        socket.on("leave", () => {
            const userID = roomSockets.get(socket.id);
            const roomName = roomUsers.get(userID);
            // leave room if there's one
            roomUsers.delete(userID);
            if (rooms.has(roomName)) {
                let users = rooms.get(roomName).users;
                users.delete(userID);
                socket.leave(roomName);
                // notify others in room
                roomIO.to(roomName).emit("left", userID);
                // delete room if empty
                if (users.size === 0) rooms.delete(roomName);
            }
        });

        /* user is ready */
        socket.on("ready", async () => {
            const userID = roomSockets.get(socket.id);
            const roomName = roomUsers.get(userID);
            // is ready
            let room = rooms.get(roomName);
            let users = room.users;
            users.set(userID, true);
            // notify others in room
            roomIO.to(roomName).emit("is ready", userID);
            // start game if reach min limit and all are ready
            if (users.size >= 3) {
                let allReady = true;
                for (const ready of users.values())
                    if (!ready) allReady = false;
                if (allReady) {
                    // create game
                    const size = room.size;
                    let game = {
                        mapLength: size.mapLength,
                        mapWidth: size.mapWidth,
                        createdAt: Date.now()
                    };
                    game = await util.createGame(game);
                    // create records
                    for (const user of users.keys()) {
                        const record = {
                            userID: user,
                            gameID: game.id
                        };
                        await util.createUserGameRecord(record);
                    }
                    // notify users in room
                    roomIO.to(roomName).emit("game start", game.id);
                }
            }
        });

        /* user is not ready */
        socket.on("not ready", () => {
            const userID = roomSockets.get(socket.id);
            const roomName = roomUsers.get(userID);
            // not ready
            let users = rooms.get(roomName).users;
            users.set(userID, false);
            // notify others in room
            roomIO.to(roomName).emit("is not ready", userID);
        });

        /* user offline */
        socket.on("disconnect", () => {
            const userID = roomSockets.get(socket.id);
            roomSockets.delete(socket.id);
            // leave room if was in an exist one
            if (roomUsers.has(userID)) {
                const roomName = roomUsers.get(userID);
                roomUsers.delete(userID);
                if (rooms.has(roomName)) {
                    let users = rooms.get(roomName).users;
                    users.delete(userID);
                    socket.leave(roomName);
                    // notify others in room
                    roomIO.to(roomName).emit("left", userID);
                    // delete room if empty
                    if (users.size === 0) rooms.delete(roomName);
                }
            }
        });
    });

    /* game socket */
    let gameIO = io.of("/game");
    gameIO.on("connection", socket => {
        /* user join game */
        socket.on("join", async (userID, gameID) => {
            // map socket to user
            gameSockets.set(socket.id, userID);
            // join game
            gameUsers.set(userID, gameID);
            socket.join(gameID);
            let game = games.get(gameID);
            if (game) {
                let users = game.users;
                users.set(userID, false);
                // notify if all joined
                if (users.size === game.userCount) {
                    // get map size
                    const thisGame = await util.getGame(gameID);
                    const mapLength = thisGame.mapLength;
                    const mapWidth = thisGame.mapWidth;
                    // gen matrix
                    let matrix = [];
                    for (let row = 0; row < mapLength; row++) {
                        let matrixRow = [];
                        for (let column = 0; column < mapWidth; column++) {
                            matrixRow.push(Math.floor(Math.random() * 4));
                        }
                        matrix.push(matrixRow);
                    }
                    // decide user initial rooms
                    let roomCount = mapLength * mapWidth;
                    let usedRooms = new Set();
                    let initialRomes = new Map();
                    for (const user of users.keys()) {
                        while (true) {
                            const roomID = Math.floor(Math.random() * roomCount);
                            if (!usedRooms.has(roomID)) {
                                usedRooms.add(roomID);
                                initialRomes.set(user, roomID);
                                break;
                            }
                        }
                    }
                    gameIO.to(gameID).emit("game info", [...initialRomes.entries()], mapLength, mapWidth, matrix);
                }
            } else {
                const userCount = await util.getGameUserCount(gameID);
                games.set(gameID, { users: new Map([[userID, false]]), userCount: userCount, outUsers: new Set(), currentHint: null, nextHint: null, votes: new Map(), scores: new Map() })
            }
        });

        /* user ready */
        socket.on("ready", async models => {
            const userID = gameSockets.get(socket.id);
            const gameID = gameUsers.get(userID);
            // is ready
            let game = games.get(gameID);
            let users = game.users;
            users.set(userID, true);
            // notify if all are ready
            let allReady = true;
            for (const ready of users.values())
                if (!ready) allReady = false;
            if (allReady) {
                // decide first hint
                const modelName = models[Math.floor(Math.random() * models.length)];
                const hints = await util.getHints(modelName);
                game.currentHint = { modelName: modelName, content: hints[Math.floor(Math.random() * hints.length)].content };
                // reset status
                for (let roundEnd of users.values()) roundEnd = false;
                // notify all
                gameIO.to(gameID).emit("all are ready", game.currentHint.content);
            }
        });

        /* user move */
        socket.on("move", position => {
            const userID = gameSockets.get(socket.id);
            const gameID = gameUsers.get(userID);
            // notify others in game
            gameIO.to(gameID).emit("moved", userID, position);
        });

        /* user play sound */
        socket.on("play sound", async () => {
            const userID = gameSockets.get(socket.id);
            const gameID = gameUsers.get(userID);
            const user = await util.getUserByID(userID);
            // notify others in game
            gameIO.to(gameID).emit("sound played", userID, user.avatarID);
        });

        /* user change vote model */
        socket.on("change vote model", (newModelName, oldModelName) => {
            const userID = gameSockets.get(socket.id);
            const gameID = gameUsers.get(userID);
            // change model if needed
            if (games.has(gameID)) {
                let votes = games.get(gameID).votes;
                if (oldModelName) votes.delete(oldModelName);
                votes.set(newModelName, 1);
                // notify others in game
                gameIO.to(gameID).emit("vote model changed", userID, newModelName, oldModelName);
            }
        });

        /* user vote */
        socket.on("vote", modelName => {
            const userID = gameSockets.get(socket.id);
            const gameID = gameUsers.get(userID);
            // vote if game exists
            if (games.has(gameID)) {
                let votes = games.get(gameID).votes;
                if (votes.has(modelName)) {
                    votes.set(modelName, votes.get(modelName) + 1);
                } else {
                    votes.set(modelName, 1);
                }
            }
        });

        /* user unvote */
        socket.on("unvote", modelName => {
            const userID = gameSockets.get(socket.id);
            const gameID = gameUsers.get(userID);
            // unvote if game exists
            if (games.has(gameID)) {
                let votes = games.get(gameID).votes;
                votes.set(modelName, votes.get(modelName) - 1);
            }
        });

        /* user unlock door */
        socket.on("unlock", door => {
            const userID = gameSockets.get(socket.id);
            const gameID = gameUsers.get(userID);
            // notify others in game
            gameIO.to(gameID).emit("unlocked", door);
        });

        /* user round end */
        socket.on("round end", async (models, doors) => {
            const userID = gameSockets.get(socket.id);
            const gameID = gameUsers.get(userID);
            // end round
            let game = games.get(gameID);
            let users = game.users;
            users.set(userID, true);
            // decide next hint if needed
            if (!game.nextHint) {
                const modelName = models[Math.floor(Math.random() * models.length)];
                const hints = await util.getHints(modelName);
                game.nextHint = { modelName: modelName, content: hints[Math.floor(Math.random() * hints.length)].content };
            }
            // notify if all are end
            let allEnd = true;
            for (const roundEnd of users.values())
                if (!roundEnd) allEnd = false;
            if (allEnd) {
                // get result
                let maxVote;
                let votedModel;
                for (const [key, value] of game.votes.entries()) {
                    if (!maxVote || value > maxVote) {
                        maxVote = value;
                        votedModel = key;
                    }
                }
                const success = votedModel === game.currentHint.modelName;
                let lockedDoor;
                let outUser;
                if (!success) {
                    // lock door
                    lockedDoor = doors[Math.floor(Math.random() * doors.length)];
                    // knock out user
                    let userArr = [...users.keys()];
                    while (game.outUsers.size !== users.size) {
                        outUser = userArr[Math.floor(Math.random() * userArr.length)];
                        if (!game.outUsers.has(outUser)) {
                            game.outUsers.add(outUser);
                            break;
                        }
                    }
                }
                // notify all
                gameIO.to(gameID).emit("next round", [...game.votes.entries()], game.nextHint.content, success, lockedDoor, outUser);
                // reset status
                for (const user of users.keys()) users.set(user, false);
                game.currentHint = game.nextHint;
                game.nextHint = null;
                game.votes = new Map();
            }
        });

        /* game over */
        socket.on("game over", async (success, score) => {
            const userID = gameSockets.get(socket.id);
            const gameID = gameUsers.get(userID);
            // end game
            let game = games.get(gameID);
            let users = game.users;
            users.set(userID, true);
            // save score
            game.scores.set(userID, score);
            // save record
            let record = await util.getUserGameRecord(userID, gameID);
            record.state = success ? 1 : 2;
            record.score = score;
            await record.save();
            // notify if all are end
            let allEnd = true;
            for (const roundEnd of users.values())
                if (!roundEnd) allEnd = false;
            if (allEnd) {
                gameIO.to(gameID).emit("game is over", [...game.scores.entries()]);
            }
        });

        /* user offline */
        socket.on("disconnect", () => {
            const userID = gameSockets.get(socket.id);
            const gameID = gameUsers.get(userID);
            gameSockets.delete(socket.id);
            // delete from game if needed
            if (gameID) {
                gameUsers.delete(userID);
                // leave game if needed
                if (games.has(gameID)) {
                    let users = games.get(gameID).users;
                    users.delete(userID);
                    socket.leave(gameID);
                    // notify others in game
                    gameIO.to(gameID).emit("left", userID);
                    // delete game if empty
                    if (users.size === 0) games.delete(gameID);
                }
            }
        });
    });
};
