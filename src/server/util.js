const model = require("./model");
const User = model.users;
const Game = model.games;
const UserGameRecord = model.user_game_records;
const Hint = model.hints;

module.exports = {
    createUser: async user => await User.create(user),
    getUserByID: async id => await User.findById(id),
    getUserByName: async username => await User.findOne({ where: { username: username } }),
    createGame: async game => await Game.create(game),
    getGame: async id => await Game.findById(id),
    createUserGameRecord: async record => await UserGameRecord.create(record),
    getUserGameRecords: async userID => await UserGameRecord.findAll({ where: { userID: userID } }),
    getUserGameRecord: async (userID, gameID) => await UserGameRecord.findOne({ where: { userID: userID, gameID: gameID } }),
    getUserGameCount: async userID => await UserGameRecord.count({ where: { userID: userID } }),
    getGameUserCount: async gameID => await UserGameRecord.count({ where: { gameID: gameID } }),
    getHints: async modelName => await Hint.findAll({ where: { modelName: modelName } })
};
