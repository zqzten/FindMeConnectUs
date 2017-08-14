const db = require('../db');

module.exports = db.defineModel('users', {
    username: {
        type: db.STRING,
        unique: true
    },
    password: db.STRING(60),
    avatarID: db.INTEGER,
    modelID: db.INTEGER,
    signature: db.STRING,
    createdAt: db.BIGINT
});
