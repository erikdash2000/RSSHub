module.exports = function (router) {
    router.get('/a9vgsx/:mid', require('./a9vgsx/index'));
    router.get('/acwifimod', require('./acwifimod/index'));
    router.get('/applesrv', require('./applesrv/index'));
    router.get('/chinadsl', require('./chinadsl/index'));
};
