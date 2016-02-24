var GithubApi = require('github');

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
};

module.exports = follow;