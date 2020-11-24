const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'emobility'
});
conn.connect(function(err) {
    if (err) throw err;
    console.log('Database is connected successfully !');
});
conn.query("SELECT * FROM nutzertyp", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
});
