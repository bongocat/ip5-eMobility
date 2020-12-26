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

/******************
 * User
 *****************/

// TODO: User functions for: Create, Update, Delete

/** getter **/
megadb.user = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from nutzer', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
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

/******************
 * Usertype
 *****************/

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

/******************
 * Invoice
 *****************/

// TODO: Invoice functions for: Create, Update, Delete

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

/******************
 * Invoicetype
 *****************/

// TODO: Invoicetype functions for: Create, Update, Delete

/** getter **/
megadb.invoicetype = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from rechnungstyp', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.invoicetypeByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from rechnungstyp WHERE RechnungsTypID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

/******************
 * Loads
 *****************/

/** getter **/
megadb.getAllLoads = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from loads', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.getLoadByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from loads WHERE LoadID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

/** create **/
megadb.newInactiveLoad = (loadTypeID, facilityID, tenantID, comment) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO loads (LoadTypID, AnlageNr, MieterID, Aktiv, Kommentar) VALUES (?,?,?,0,?)', [loadTypeID, facilityID, tenantID, comment], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

/** update **/
megadb.setLoadActiveByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE loads SET loads.Aktiv = 1 WHERE LoadID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.setLoadInactiveByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE loads SET loads.Aktiv = 0 WHERE LoadID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.updateLoadByID = (loadTypeID, facilityID, tenantID, active, comment, loadid) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE loads SET LoadTypID = ?, AnlageNr = ?, MieterID = ?, Aktiv = ?, Kommentar = ? WHERE LoadID = ?', [loadTypeID, facilityID, tenantID, active, comment, loadid], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

/******************
 * Loadtype
 *****************/

/** getter **/
megadb.loadtype = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from loadtyp', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.loadtypeByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from loadtyp WHERE LoadTypID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

/******************
 * Facility
 *****************/

/** getter **/
megadb.facility = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from anlagen', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.facilityByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from anlagen WHERE AnlageID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

/** create **/
megadb.newFacility = (administratorID, designation, street, streetNumber, areaCode, city, country, active, comment) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO anlagen (VerwalterID, Bezeichnung, Strasse, StrassenNr, PLZ, Ort, Land, Aktiv, Kommentar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [administratorID, designation, street, streetNumber, areaCode, city, country, active, comment], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

/** update **/
megadb.updateFacilityByID = (administratorID, designation, street, streetNumber, areaCode, city, country, active, comment, facilityID) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE anlagen SET VerwalterID = ?, Bezeichnung = ?, Strasse = ?, StrassenNr = ?, PLZ = ?, Ort = ?, Land = ?, Aktiv = ?, Kommentar = ? WHERE AnlageID = ?', [administratorID, designation, street, streetNumber, areaCode, city, country, active, comment, facilityID], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};


/******************
 * Invoice Positions
 *****************/

// TODO: Invoice Position functions for: Create, Update, Delete

/** getter **/
megadb.invoiceposition = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from rechnungspositionen', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.invoicepositionByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from rechnungspositionen WHERE RechnungsPositionID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

megadb.invoicepositionByInvoiceNummer = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from rechnungspositionen WHERE  RechnungsNummer  = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.invoicepositionByIDByInvoiceNummer = (invoiceid, positionid) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from rechnungspositionen WHERE  RechnungsNummer  = ? AND RechnungsPositionID = ?', [invoiceid,positionid], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

module.exports = megadb;
