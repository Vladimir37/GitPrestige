var GithubApi = require('github');

var db = require('./db');

function star(bot, user, repo) {
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
    github.repos.star({
        user,
        repo
    });
    db.logs.create({
        text: bot.name + ' (' + bot.id + ') star ' + user + '/' + repo
    }).then(function() {
        var stars = JSON.parse(bot.starred);
        stars.push(user + '/' + repo);
        return db.bots.update({
            starred: JSON.stringify(stars)
        }, {
            where: {
                id: bot.id
            }
        });
    }).catch(function(err) {
        console.log(err);
    });
};

module.exports = star;