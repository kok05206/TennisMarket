// let server = require('./server');
// let router = require('./router');
// let requestHandler = require('./requestHandler');

// const mariadb = require('./database/connect/mariadb');
// mariadb.connect(); // mariadb 연결!

// server.start(router.route, requestHandler.handle); // 실행을 하고 싶을 때만 실행하고 싶음.
let server = require('./server');
let router = require('./router');
let requestHandler = require('./requestHandler');

const mariadb = require('./database/connect/mariadb');
mariadb.connect();

server.start(router.route, requestHandler.handle);
