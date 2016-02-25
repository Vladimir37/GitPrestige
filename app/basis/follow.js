var GithubApi = require('github');

var db = require('./db');

function follow(bot, user) {
    var github = new GithubApi({
        version: "3.0.0",
        debug: false,
        protocol: "https",
        host: "api.github.com",
        timeout: 5000,
        headers: {
            "user-agent": "GitPrestige"
        }
    });
    github.authenticate({
        type: "basic",
        username: bot.name,
        password: bot.pass
    });
    github.user.followUser({
        user: user
    });
    db.logs.create({
        text: bot.name + ' (' + bot.id + ') subscribe to ' + user
    }).then(function() {
        var followers = JSON.parse(bot.followed);
        followers.push(user);
        return db.bots.update({
            followed: JSON.stringify(followers)
        }, {
            where: {
                id: bot.id
            }
        });
    }).catch(function(err) {
        console.log(err);
    });
};

module.exports = follow;