const db = require("../db");

module.exports = db.defineModel("user_game_records", {
    userID: db.ID,
    gameID: db.ID,
    state: {
        type: db.INTEGER,
        defaultValue: 0
    },
    score: {
        type: db.INTEGER,
        defaultValue: 0
    }
});
