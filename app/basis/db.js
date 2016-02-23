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
    followed: Sequelize.TEXT
});

tables.orders = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    price: Sequelize.INTEGER,
    stars: Sequelize.TEXT,
    stars_count: Sequelize.INTEGER,
    follow: Sequelize.TEXT,
    follow_count: Sequelize.INTEGER
});

tables.actions = sequelize.define('actions', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    bot: Sequelize.INTEGER,
    action: Sequelize.INTEGER,
    target: Sequelize.TEXT
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