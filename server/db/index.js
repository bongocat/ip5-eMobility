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

/** create **/
megadb.newUser = (userType, name, familyName, salutation, company, phone, mobile, email, street, streetNumber, areaCode, city, country, invoiceToShippingAdress, ShippingStreet, ShippingStreetNumber, ShippingAreaCode, ShippingCity, ShippingCountry, active, comment) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO nutzer (NutzerTypID, Vorname, Nachname, Anrede, Firma, FestnetzNummer, HandyNummer, EMailAdresse, WStrasse, WStrassenNr, WPLZ, WOrt, WLand, RiW, RStrasse, RStrassenNr, RPLZ, ROrt, RLand, Aktiv, Kommentar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [userType, name, familyName, salutation, company, phone, mobile, email, street, streetNumber, areaCode, city, country, invoiceToShippingAdress, ShippingStreet, ShippingStreetNumber, ShippingAreaCode, ShippingCity, ShippingCountry, active, comment], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

/** update **/
megadb.updateUserByID = (userType, name, familyName, salutation, company, phone, mobile, email, street, streetNumber, areaCode, city, country, invoiceToShippingAdress, ShippingStreet, ShippingStreetNumber, ShippingAreaCode, ShippingCity, ShippingCountry, active, comment, userID) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE nutzer SET NutzerTypID = ?, Vorname = ?, Nachname = ?, Anrede = ?, Firma = ?, FestnetzNummer = ?, HandyNummer = ?, EMailAdresse = ?, WStrasse = ?, WStrassenNr = ?, WPLZ = ?, WOrt = ?, WLand = ?, RiW = ?, RStrasse = ?, RStrassenNr = ?, RPLZ = ?, ROrt = ?, RLand = ?, Aktiv = ?, Kommentar = ? WHERE NutzerID = ?', [userType, name, familyName, salutation, company, phone, mobile, email, street, streetNumber, areaCode, city, country, invoiceToShippingAdress, ShippingStreet, ShippingStreetNumber, ShippingAreaCode, ShippingCity, ShippingCountry, active, comment, userID], (err, results) => {
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
        connection.query('SELECT * FROM nutzertyp', (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.usertypeByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM nutzertyp WHERE NutzerTypID = ?', [id], (err, results) => {
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

/** create **/
megadb.newInvoice = (invoiceNumber, invoiceTypeID, customerRefID, invoiceToRefID, loadID, invoiceDate, toPayUntil, isPayed, name, familyName,
                     salutation, company, phone, mobile, email, street, streetNumber, areaCode, city, country, ShippingStreet,
                     ShippingStreetNumber, ShippingAreaCode, ShippingCity, ShippingCountry, counterOld, counterOldDate, counterNew, counterNewDate, active, comment) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO rechnung (RechnungsNummer, RechnungsTypID, KundenReferenzID, RechnungAnReferenzID, LoadID, RechnungGestellt, ZuZahlenBis, RechnungBezahlt, ' +
            'Vorname, Nachname, Anrede, Firma, FestnetzNummer, HandyNummer, EMailAdresse, WStrasse, WStrassenNr, WPLZ, WOrt, WLand, RStrasse, RStrassenNr, RPLZ, ROrt, RLand, ' +
            'ZählerAlt, ZählerAltDatum, ZählerNeu, ZählerNeuDatum, Aktiv, Kommentar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                invoiceNumber, invoiceTypeID, customerRefID, invoiceToRefID, loadID, invoiceDate, toPayUntil, isPayed, name, familyName, salutation,
                company, phone, mobile, email, street, streetNumber, areaCode, city, country, ShippingStreet, ShippingStreetNumber, ShippingAreaCode, ShippingCity,
                ShippingCountry, counterOld, counterOldDate, counterNew, counterNewDate, active, comment
            ], (err, results) => {
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });
    });
};

/** update **/
megadb.updateInvoice = (invoiceNumber, invoiceTypeID, customerRefID, invoiceToRefID, loadID, invoiceDate, toPayUntil, isPayed, name, familyName,
                     salutation, company, phone, mobile, email, street, streetNumber, areaCode, city, country, ShippingStreet,
                     ShippingStreetNumber, ShippingAreaCode, ShippingCity, ShippingCountry, counterOld, counterOldDate, counterNew, counterNewDate, active, comment, invoiceID) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE rechnung SET RechnungsNummer = ?, RechnungsTypID = ?, KundenReferenzID = ?, RechnungAnReferenzID = ?, LoadID = ?, RechnungGestellt = ?, ZuZahlenBis = ?, RechnungBezahlt = ?, ' +
            'Vorname = ?, Nachname = ?, Anrede = ?, Firma = ?, FestnetzNummer = ?, HandyNummer = ?, EMailAdresse = ?, WStrasse = ?, WStrassenNr = ?, WPLZ = ?, WOrt = ?, WLand = ?, RStrasse = ?, RStrassenNr = ?, RPLZ = ?, ROrt = ?, RLand = ?, ' +
            'ZählerAlt = ?, ZählerAltDatum = ?, ZählerNeu = ?, ZählerNeuDatum = ?, Aktiv = ?, Kommentar = ? WHERE RechnungID = ?',
            [
                invoiceNumber, invoiceTypeID, customerRefID, invoiceToRefID, loadID, invoiceDate, toPayUntil, isPayed, name, familyName, salutation,
                company, phone, mobile, email, street, streetNumber, areaCode, city, country, ShippingStreet, ShippingStreetNumber, ShippingAreaCode, ShippingCity,
                ShippingCountry, counterOld, counterOldDate, counterNew, counterNewDate, active, comment, invoiceID
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
megadb.newInactiveLoad = (LoadTypID, FacilityID, TenantID, InvoiceTo, FirstInvoice, IntervalElectricity, IntervalService, Active, Comment) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO loads (LoadTypeID, FacilityID, TenantID, InvoiceTo, FirstInvoice, IntervalElectricity, IntervalService, Active, Comment) VALUES (?,?,?,?,?,?,?,0,?)', [LoadTypID, FacilityID, TenantID, InvoiceTo, FirstInvoice, IntervalElectricity, IntervalService, Active, Comment], (err, results) => {
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
        connection.query('UPDATE loads SET loads.Active = 1 WHERE LoadID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

   megadb.setLoadInactiveByID = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE loads SET loads.Active = 0 WHERE LoadID = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};


megadb.updateLoadByID = (loadTypeID, facilityID, tenantID, invoiceTo, firstInvoice, intervalElectricity, intervalService, active, comment, loadID) => {
    return new Promise((resolve, reject) => {
        connection.query('UPDATE loads SET LoadTypeID = ?, FacilityID = ?, TenantID = ?, InvoiceTo = ?, FirstInvoice = ?, IntervalElectricity = ?, IntervalService = ?, Active = ?, Comment = ? WHERE LoadID = ?', [loadTypeID, facilityID, tenantID, invoiceTo, firstInvoice, intervalElectricity, intervalService, active, comment, loadID], (err, results) => {
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
        connection.query('SELECT * from loadtyp WHERE LoadTypeID = ?', [id], (err, results) => {
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
        connection.query('SELECT * from rechnungspositionen WHERE InvoicePositionID  = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

megadb.invoicepositionByInvoiceNummer = (id) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from rechnungspositionen WHERE  InvoiceNummer  = ?', [id], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

megadb.invoicepositionByIDByInvoiceNummer = (invoiceid, positionid) => {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * from rechnungspositionen WHERE InvoiceNummer  = ? AND InvoicePositionID  = ?', [invoiceid, positionid], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};

/** create **/
megadb.newInvoicePosition = (invoicePositionID, invoiceNummer, positionName, price,amount, netto, vat, brutto, active, comment) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO rechnungspositionen (InvoicePositionID, InvoiceNummer, PositionName, Price, Amount, Netto, Vat, Brutto, Active, Comment) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [invoicePositionID, invoiceNummer, positionName, price,amount, netto, vat, brutto, active, comment], (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
};
module.exports = megadb;
