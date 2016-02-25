var randomToken = require('random-token');

var db = require('./../basis/db');
var execution = require('./../basis/execution');

function ordering(req, res, next) {
    //data
    var price = req.body.price;
    var profile = req.body.profile;
    var followers_c = req.body.followers_c;
    var stars_c = req.body.stars_c;
    //repository and stars
    var repo_count = req.body.repo_count;
    var repos = [];
    for(var i = 0; i < repo_count; i++) {
        repos[i] = {
            addr: req.body['repo_addr_' + i],
            stars: req.body['repo_stars_' + i]
        }
    }
    //add to db
    var new_key = randomToken(32);
    db.orders.create({
        price,
        profile,
        stars: JSON.stringify(repos),
        stars_count: stars_c,
        follow_count: followers_c,
        key: new_key
    }).then(function(result) {
        return db.logs.create({
            text: 'Order num ' + result.id + ' was created;'
        });
    }).then(function() {
        res.end(JSON.stringify({status: 0, key: new_key}));
    }, function(err) {
        console.log(err);
        res.end(JSON.stringify({status: 1, key: null}));
    });
};

module.exports = ordering;