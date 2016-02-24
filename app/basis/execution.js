var db = require('./../basis/db');
var follow = require('./follow');
var star = require('./star');

function execution(order_key) {
    var order;
    db.orders.findOne({
        where: {
            key: order_key,
            complete: 0
        }
    }).then(function(target_order) {
        if(!target_order) {
            throw 'Order not found';
        }
        else {
            order = target_order;
            return db.bots.findAll({
                where: {
                    active: 1
                }
            });
        }
    }).then(function(bots) {
        //add followers
        if(order.follow_count) {
            var follow_count = order.follow_count;
            var bot_num = 0;
            while(follow_count) {
                var current_bot = bots[bot_num];
                if(!current_bot) {
                    break;
                }
                bot_num++;
                var bot_followed = JSON.parse(current_bot.followed);
            }
        }
    }).catch(function(err) {
        console.log('ERROR');
        console.log(err);
    });
};
module.exports = execution;