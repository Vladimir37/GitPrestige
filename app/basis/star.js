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
};

module.exports = star;