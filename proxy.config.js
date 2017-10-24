'use strict';
const proxyServer = "http://localhost:9090/uadp-srv/";

const mock = {'GET /*.do': proxyServer, 'POST /*.do': proxyServer};

/*require('fs').readdirSync(require('path').join(__dirname + '/mock'))
 .forEach(function (file) {
 assign(mock, require('./mock/' + file));
 });*/

module.exports = mock;
