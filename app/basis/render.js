function render(file) {
    return function(req, res, next) {
        res.render(file + '.jade');
    };
};

module.exports = render;