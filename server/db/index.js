const mysql = require('mysql');

mysql.createPool({
    connectionLimit: 10,
    password: '',
    user: 'root',
    database: 'emobility',
    host: 'localhost',
    port: '3306',
});

let megadb = {}

megadb.all = () => {

};

module.exports = megadb;
