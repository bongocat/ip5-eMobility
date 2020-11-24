let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "emobility"
});

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM nutzertyp", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});
