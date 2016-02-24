var db = require('./db');

var checking = require('./user_checking');

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
            return checking(login, pass, mail);
        }
    }).then(function() {
        return db.bots.create({
            name: login,
            pass: pass,
            mail: mail,
            starred: '[]',
            followed: '[]'
        });
    }).then(function() {
        res.end('Success!');
    }).catch(function(err) {
        console.log(err);
        if(err == 1) {
            res.end('Incorrect data');
        }
        else {
            res.end('Server error');
        }
    });
};

module.exports = adding;