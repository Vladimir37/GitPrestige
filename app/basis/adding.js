var GithubApi = require('github');

var db = require('./db');

//add bot account
function adding(req, res, next) {
    //data
    var login = req.body.login;
    var pass = req.body.pass;
    var mail = req.body.mail;
    //testing
    db.bots.findOne({
        where: {
            name: login
        }
    }).then(function(user) {
        if(user) {
            res.end('User is exist!');
        }
        else {
            //correctness testing
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
                    res.end('Incorrect data');
                }
                else {
                    //correct data, add to DB
                    return db.bots.create({
                        name: login,
                        pass: pass,
                        mail: mail,
                        starred: '[]',
                        followed: '[]'
                    });
                }
            });
        }
    }).then(function() {
        res.end('Success!');
    }).catch(function(err) {
        console.log(err);
        res.end('Server error');
    });
};

module.exports = adding;