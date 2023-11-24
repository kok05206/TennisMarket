const mariadb = require('mysql'); // 모듈 불러오기

// mariadb모듈이 가지고 있는 함수
const conn = mariadb.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'Tennis',
});

module.exports = conn;
