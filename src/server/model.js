const fs = require('fs');

const db = require('./db');

module.exports = {};

fs.readdirSync(__dirname + '/models').filter(f => {
    return f.endsWith('.js');
}).forEach(f => {
    const name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/models/' + f);
});

module.exports.sync = () => db.sync();
