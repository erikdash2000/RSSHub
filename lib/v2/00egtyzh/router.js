module.exports = function (router) {
    router.get('/a9vgsx/:mid', require('./a9vgsx/index'));
    router.get('/acwifimod', require('./acwifimod/index'));
};
