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

/**
 * User
 */

/** getter **/

megadb.user = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from nutzer', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

megadb.userByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from nutzer WHERE NutzerID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

/**
 * Usertype
 */

/** getter **/

megadb.usertype = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from nutzertyp', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.usertypeByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from nutzertyp WHERE NutzerTypID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

/**
 * Invoice
 */

/** getter **/

megadb.invoice = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from rechnung', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.invoiceByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from rechnung WHERE RechnungID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

module.exports = megadb;
