var Sequelize = require('sequelize');

var db_config = require('../../config/db');

var sequelize = new Sequelize(db_config.database, db_config.login, db_config.pass, {
    dialect: db_config.dialect,
    port: db_config.port,
    logging: false
});


//testing connect
sequelize.authenticate().then(function() {
    console.log('Connect to DB created!');
}, function(err) {
    console.log('Connection error: ' + err);
});

var tables = {};

tables.bots = sequelize.define('bots', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.TEXT,
    pass: Sequelize.TEXT,
    mail: Sequelize.TEXT,
    starred: Sequelize.TEXT,
    followed: Sequelize.TEXT,
    active: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
});

tables.orders = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    price: Sequelize.INTEGER,
    profile: Sequelize.TEXT,
    stars: Sequelize.TEXT,
    stars_count: Sequelize.INTEGER,
    follow_count: Sequelize.INTEGER,
    key: Sequelize.TEXT,
    complete: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

tables.logs = sequelize.define('logs', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: Sequelize.TEXT
});

//synchronization tables
for(var table in tables) {
    tables[table].sync().then(function() {
        //success
    }, function(err) {
        console.log('Database error: ' + err);
    });
};

module.exports = tables;