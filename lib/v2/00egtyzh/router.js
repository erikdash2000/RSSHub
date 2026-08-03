module.exports = function (router) {
    router.get('/a9vgsx/:mid', require('./a9vgsx/index'));
    router.get('/acwifimod', require('./acwifimod/index'));
    router.get('/applesrv', require('./applesrv/index'));
    router.get('/chinadsl', require('./chinadsl/index'));
    router.get('/githubtr/:tid', require('./githubtr/index'));
    router.get('/mobaxterm', require('./mobaxterm/index'));
    router.get('/nintendohk', require('./nintendohk/index'));
    router.get('/pappz', require('./pappz/index'));
    router.get('/u9a9mod/:sid', require('./u9a9mod/index'));
    router.get('/v2rayagent', require('./v2rayagent/index'));
    router.get('/v2rayssr', require('./v2rayssr/index'));
};
