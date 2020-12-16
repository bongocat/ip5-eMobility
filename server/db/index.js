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

megadb.usertype = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from nutzertyp', (err,results) => {
            if (err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.usertypeByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from nutzertyp WHERE NutzerTypID = ?', [id], (err,results) => {
            if (err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

module.exports = megadb;
