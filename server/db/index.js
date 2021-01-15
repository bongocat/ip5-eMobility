const mysql = require('mysql');

const connection = mysql.createPool({
    connectionLimit: 10,
    password: '',
    user: 'root',
    database: 'emobility2',
    host: 'localhost',
    port: '3306',
});

let megadb = {}

/******************
 * User
 *****************/

/** getter **/
megadb.user = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from users', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.userByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from users WHERE userID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

/** create **/
megadb.newUser = (userTypeID, name, familyName, salutation, company, phone, mobile, email, street, streetNumber, areaCode, city, country, invoiceToShippingAdress, shippingStreet, shippingStreetNumber, shippingAreaCode, shippingCity, shippingCountry, active, comment) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO users (userTypeID, name, familyName, salutation, company, phone, mobile, email, street, streetNumber, areaCode, city, country, invoiceToShippingAdress, shippingStreet, shippingStreetNumber, shippingAreaCode, shippingCity, shippingCountry, active, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userTypeID, name, familyName, salutation, company, phone, mobile, email, street, streetNumber, areaCode, city, country, invoiceToShippingAdress, shippingStreet, shippingStreetNumber, shippingAreaCode, shippingCity, shippingCountry, active, comment], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

/** update **/
megadb.updateUserByID = (userTypeID, name, familyName, salutation, company, phone, mobile, email, street, streetNumber, areaCode, city, country, invoiceToShippingAdress, shippingStreet, shippingStreetNumber, shippingAreaCode, shippingCity, shippingCountry, active, comment, userID) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE users SET userTypeID = ?, name = ?, familyName = ?, salutation = ?, company = ?, ' +
                        'phone = ?, mobile = ?, email = ?, street = ?, streetNumber = ?, areaCode = ?, city = ?, ' +
                        'country = ?, invoiceToShippingAdress = ?, shippingStreet = ?, shippingStreetNumber = ?, ' +
                        'shippingAreaCode = ?, shippingCity = ?, shippingCountry = ?, active = ?, comment = ? ' +
                        'WHERE userID = ?',
                        [userTypeID, name, familyName, salutation, company, phone, mobile, email, street, streetNumber,
                            areaCode, city, country, invoiceToShippingAdress, shippingStreet, shippingStreetNumber,
                            shippingAreaCode, shippingCity, shippingCountry, active, comment, userID], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

/******************
 * Usertype
 *****************/

/** getter **/
megadb.usertype = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM usertypes', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.usertypeByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM usertypes WHERE userTypeID = ?', [id], (err, results) => {
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

/** getter **/
megadb.invoice = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from invoices', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.invoiceByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from invoices WHERE invoiceID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

/** create **/
megadb.newInvoice = (invoiceNumber, invoiceTypeID, customerRefID, invoiceToRefID, invoiceDate, toPayUntil, payedOn, name, familyName,
                     salutation, company, phone, mobile, email, street, streetNumber, areaCode, city, country, invoiceToShippingAdress, shippingStreet,
                     shippingStreetNumber, shippingAreaCode, shippingCity, shippingCountry, invoiceStatusID, active, comment) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO invoices (invoiceNumber, invoiceTypeID, customerRefID, invoiceToRefID, invoiceDate, toPayUntil, payedOn, name, familyName,' +
            'salutation, company, phone, mobile, email, street, streetNumber, areaCode, city, country, invoiceToShippingAdress, shippingStreet,' +
            'shippingStreetNumber, shippingAreaCode, shippingCity, shippingCountry, invoiceStatusID, active, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)',
            [
                invoiceNumber, invoiceTypeID, customerRefID, invoiceToRefID, invoiceDate, toPayUntil, payedOn, name, familyName,
                salutation, company, phone, mobile, email, street, streetNumber, areaCode, city, country, invoiceToShippingAdress, shippingStreet,
                shippingStreetNumber, shippingAreaCode, shippingCity, shippingCountry, invoiceStatusID, active, comment
            ], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
    });
};

/** update **/
megadb.updateInvoice = (invoiceNumber, invoiceTypeID, customerRefID, invoiceToRefID, invoiceDate, toPayUntil, payedOn, name, familyName,
                        salutation, company, phone, mobile, email, street, streetNumber, areaCode, city, country, invoiceToShippingAdress, shippingStreet,
                        shippingStreetNumber, shippingAreaCode, shippingCity, shippingCountry, invoiceStatusID, active, comment, invoiceID) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE invoices SET invoiceNumber = ?, invoiceTypeID = ?, customerRefID = ?, invoiceToRefID = ?, invoiceDate = ?, toPayUntil = ?, payedOn = ?, name = ?, familyName = ?,' +
            'salutation = ?, company = ?, phone = ?, mobile = ?, email = ?, street = ?, streetNumber = ?, areaCode = ?, city = ?, country = ?, invoiceToShippingAdress = ?, shippingStreet = ?,' +
            'shippingStreetNumber = ?, shippingAreaCode = ?, shippingCity = ?, shippingCountry = ?, invoiceStatusID = ?, active = ?, comment = ? WHERE invoiceID = ?',
            [
                invoiceNumber, invoiceTypeID, customerRefID, invoiceToRefID, invoiceDate, toPayUntil, payedOn, name, familyName,
                salutation, company, phone, mobile, email, street, streetNumber, areaCode, city, country, invoiceToShippingAdress, shippingStreet,
                shippingStreetNumber, shippingAreaCode, shippingCity, shippingCountry, invoiceStatusID, active, comment, invoiceID
            ], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
    });
};

/******************
 * Invoicetype
 *****************/

/** getter **/
megadb.invoicetype = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from invoicetypes', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.invoicetypeByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from invoicetypes WHERE invoiceTypeID = ?', [id], (err, results) => {
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
            console.log(results)
            return resolve(results);
        });
    });
};

megadb.getLoadByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from loads WHERE loadID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

/** create **/
megadb.newInactiveLoad = (loadTypeID, facilityID, tenantID, invoiceTo, firstInvoice, intervalElectricity, intervalService, counterOld, counterOldDate, counterNew, counterNewDate, comment) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO loads (loadTypeID, facilityID, tenantID, invoiceTo, firstInvoice, intervalElectricity, intervalService, counterOld, counterOldDate, counterNew, counterNewDate, active, comment) VALUES (?,?,?,?,?,?,?,?,?,?,?,0,?)', [loadTypeID, facilityID, tenantID, invoiceTo, firstInvoice, intervalElectricity, intervalService, counterOld, counterOldDate, counterNew, counterNewDate, comment], (err, results) => {
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
        connection.query('UPDATE loads SET loads.active = 1 WHERE loadID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.setLoadInactiveByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE loads SET loads.active = 0 WHERE loadID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.updateLoadByID = (loadTypeID, facilityID, tenantID, invoiceTo, firstInvoice, intervalElectricity, intervalService, counterOld, counterOldDate, counterNew, counterNewDate, active, comment, loadID) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE loads SET loadTypeID = ?, facilityID = ?, tenantID = ?, invoiceTo = ?, firstInvoice = ?, intervalElectricity = ?, intervalService = ?, counterOld = ?, counterOldDate = ?, counterNew = ?, counterNewDate = ?, active = ?, comment = ? WHERE loadID = ?', [loadTypeID, facilityID, tenantID, invoiceTo, firstInvoice, intervalElectricity, intervalService, counterOld, counterOldDate, counterNew, counterNewDate, active, comment, loadID], (err, results) => {
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
        connection.query('SELECT * from loadtypes', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.loadtypeByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from loadtypes WHERE loadTypeID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

/** create **/
megadb.newLoadtype = (designation, standardPriceWhenActive, standardPriceWhenInactive, active, comment) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO loadtypes (designation, standardPriceWhenActive, standardPriceWhenInactive, active, comment) VALUES (?,?,?,?,?)', [designation, standardPriceWhenActive, standardPriceWhenInactive, active, comment], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

/** update **/
megadb.updateLoadtype = (designation, standardPriceWhenActive, standardPriceWhenInactive, active, comment, loadTypeID) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE loadtypes  SET designation = ?, standardPriceWhenActive = ?, standardPriceWhenInactive = ?, active = ?, comment = ? WHERE loadTypeID = ?', [designation, standardPriceWhenActive, standardPriceWhenInactive, active, comment, loadTypeID], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

/******************
 * Facility
 *****************/

/** getter **/
megadb.facility = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from facilities', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.facilityByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from facilities WHERE facilityID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

/** create **/
megadb.newFacility = (administrationID, designation, street, streetNumber, areaCode, city, country, active, comment) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO facilities (administrationID, designation, street, streetNumber, areaCode, city, country, active, comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [administrationID, designation, street, streetNumber, areaCode, city, country, active, comment], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

/** update **/
megadb.updateFacilityByID = (administrationID, designation, street, streetNumber, areaCode, city, country, active, comment, facilityID) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE facilities SET administrationID = ?, designation = ?, street = ?, streetNumber = ?, areaCode = ?, city = ?,country = ?, active = ?, comment = ? WHERE facilityID = ?', [administrationID, designation, street, streetNumber, areaCode, city, country, active, comment, facilityID], (err, results) => {
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

/** getter **/
megadb.invoiceposition = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from invoicepositions', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.invoicepositionByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from invoicepositions WHERE invoicePositionID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

megadb.invoicepositionByInvoiceNummer = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from invoicepositions WHERE  invoiceNumber = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.invoicepositionByIDByInvoiceNummer = (invoiceid, positionid) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from invoicepositions WHERE invoiceNumber = ? AND invoicePositionID = ?', [invoiceid, positionid], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

/** create **/
megadb.newInvoicePosition = (invoiceNumber, positionName, loadID, price, amount, netto, vat, brutto, active, comment) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO invoicepositions (invoiceNumber, positionName, loadID, price, amount, netto, vat, brutto, active, comment) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [invoiceNumber, positionName, loadID, price, amount, netto, vat, brutto, active, comment], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

/** update **/
megadb.updateInvoicePosition = (invoiceNumber, positionName, loadID, price, amount, netto, vat, brutto, active, comment, invoicePositionID) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE invoicepositions SET invoiceNumber = ?, positionName = ?, loadID = ?, price = ?, amount = ?, netto = ?, vat = ?, brutto = ?, active = ?, comment = ? WHERE invoicePositionID = ?', [invoiceNumber, positionName, loadID, price, amount, netto, vat, brutto, active, comment, invoicePositionID], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

/******************
 * Invoice Status
 *****************/

/** getter **/
megadb.invoicestatus = () => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from invoicestatus', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.invoicestatusByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from invoicestatus WHERE invoiceStatusID  = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

module.exports = megadb;
