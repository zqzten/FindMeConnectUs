const db = require('../db');

module.exports = db.defineModel('games', {
    mapLength: db.INTEGER,
    mapWidth: db.INTEGER,
    createdAt: db.BIGINT
});
