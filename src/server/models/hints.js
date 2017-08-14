const db = require('../db');

module.exports = db.defineModel('hints', {
    modelName: db.STRING,
    content: db.STRING
});
