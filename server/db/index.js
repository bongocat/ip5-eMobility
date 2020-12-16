const mysql = require('mysql');

const connection = mysql.createPool({
    connectionLimit: 10,
    password: '',
    user: 'root',
    database: 'emobility',
    host: 'localhost',
    port: '3306',
});

let megadb = {}

megadb.all = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from nutzertyp', (err,results) => {
            if (err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = megadb;
