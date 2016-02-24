var GithubApi = require('github');

function checking(login, pass, mail) {
    return new Promise(function(resolve, reject) {
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
            username: login,
            password: pass
        });

        github.user.getEmails({}, function(err, ret) {
            //incorrect data
            if(err) {
                reject(1);
            }
            else {
                //correct data, add to DB
                resolve();
            }
        });
    });
};

module.exports = checking;