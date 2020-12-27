const express = require('express');
const db = require('../db');
const router = express.Router();

/******************
 * User
 *****************/

/**
 * Get all users
 */
router.get('/users', async (req, res, next) => {

    try {
        let results = await db.user();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a specific user by their id
 */
router.get('/users/:id', async (req, res, next) => {

    try {
        let results = await db.userByID(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Create a new user
 *
 * Example for POST JSON:
 * {
    "userType": "1",
    "name" : "Metro",
    "familyName" : "Deamon",
    "salutation": "Mister",
    "company": "Blue",
    "phone": "0611111111",
    "mobile": "0798898989",
    "email": "metro.deamon@blue.co",
    "street": "Ponystreet",
    "streetNumber": "42",
    "areaCode": "6969",
    "city": "Night-City",
    "country": "Africa",
    "invoiceToShippingAdress": "1",
    "ShippingStreet": "Uwustreet",
    "ShippingStreetNumber": "1337",
    "ShippingAreaCode": "12",
    "ShippingCity": "New York",
    "ShippingCountry": "USA",
    "active": "1",
    "comment": "This is a fictional user to test the underlying api of the megalog application created for ip5 in 2020/2021"
}
 */
router.post('/users', async (req, res, next) => {
    try {
        let input = req.body;
        console.log(input);
        let results = await db.newUser(input.userType, input.name, input.familyName, input.salutation, input.company, input.phone, input.mobile, input.email, input.street, input.streetNumber, input.areaCode, input.city, input.country, input.invoiceToShippingAdress, input.ShippingStreet, input.ShippingStreetNumber, input.ShippingAreaCode, input.ShippingCity, input.ShippingCountry, input.active, input.comment);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Create a new user
 *
 * Example for POST JSON:
 * {
    "userType": "1",
    "name": "Metro",
    "familyName": "Deamon",
    "salutation": "Mister",
    "company": "Blue",
    "phone": "0611111111",
    "mobile": "0798898989",
    "email": "metro.deamon@blue.co",
    "street": "Ponystreet",
    "streetNumber": "42",
    "areaCode": "6969",
    "city": "Night-City",
    "country": "Africa",
    "invoiceToShippingAdress": "1",
    "ShippingStreet": "Uwustreet",
    "ShippingStreetNumber": "1337",
    "ShippingAreaCode": "12",
    "ShippingCity": "New York",
    "ShippingCountry": "USA",
    "active": "1",
    "comment": "This is a fictional user to test the underlying api of the megalog application created for ip5 in 2020/2021",
    "userID": "1"
}
 */
router.put('/users', async (req, res, next) => {
    try {
        let input = req.body;
        console.log(input);
        let results = await db.updateUserByID(input.userType, input.name, input.familyName, input.salutation, input.company, input.phone, input.mobile, input.email, input.street, input.streetNumber, input.areaCode, input.city, input.country, input.invoiceToShippingAdress, input.ShippingStreet, input.ShippingStreetNumber, input.ShippingAreaCode, input.ShippingCity, input.ShippingCountry, input.active, input.comment, input.userID);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/******************
 * Usertype
 *****************/

/**
 * Get all user types
 */
router.get('/users/types', async (req, res, next) => {

    try {
        let results = await db.usertype();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a specific user type by their id
 */
router.get('/users/types/:id', async (req, res, next) => {

    try {
        let results = await db.usertypeByID(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/******************
 * Invoice
 *****************/

/**
 * Get all invoices
 */
router.get('/invoices', async (req, res, next) => {

    try {
        let results = await db.invoice();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a specific invoice by their id
 */
router.get('/invoices/:id', async (req, res, next) => {

    try {
        let results = await db.invoiceByID(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/******************
 * Invoice Type
 *****************/

/**
 * Get all invoice types
 */
router.get('/invoices/types', async (req, res, next) => {

    try {
        let results = await db.invoicetype();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a invoice type by their id
 */
router.get('/invoices/types/:id', async (req, res, next) => {

    try {
        let results = await db.invoicetypeByID(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Create a new invoice
 *
 * Example for POST JSON:
 * {
    "invoiceNumber": "3",
    "invoiceTypeID": "1",
    "customerRefID": "1",
    "invoiceToRefID": "1",
    "loadID": "4",
    "invoiceDate": "1",
    "toPayUntil": "1",
    "isPayed": "1",
    "name": "1",
    "familyName": "1",
    "salutation": "1",
    "company": "1",
    "phone": "1",
    "mobile": "1",
    "email": "1",
    "street": "1",
    "streetNumber": "1",
    "areaCode": "1",
    "city": "1",
    "country": "1",
    "invoiceToShippingAdress": "1",
    "ShippingStreet": "1",
    "ShippingStreetNumber": "1",
    "ShippingAreaCode": "1",
    "ShippingCity": "2",
    "ShippingCountry": "1",
    "counterOld": "1",
    "counterOldDate": "1",
    "counterNew": "1",
    "counterNewDate": "1",
    "active": "1",
    "comment": "1"
    }
 */
router.post('/invoices', async (req, res, next) => {
    try {
        let input = req.body;
        console.log(input);
        let results = await db.newInvoice(input.invoiceNumber, input.invoiceTypeID, input.customerRefID, input.invoiceToRefID, input.loadID, input.invoiceDate, input.toPayUntil, input.isPayed, input.name, input.familyName,
            input.salutation, input.company, input.phone, input.mobile, input.email, input.street, input.streetNumber, input.areaCode, input.city, input.country, input.ShippingStreet,
            input.ShippingStreetNumber, input.ShippingAreaCode, input.ShippingCity, input.ShippingCountry, input.counterOld, input.counterOldDate, input.counterNew, input.counterNewDate, input.active, input.comment);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Update a invoice by their id
 *
 * Example for PUT JSON:
 * {
    "invoiceNumber": "3",
    "invoiceTypeID": "1",
    "customerRefID": "1",
    "invoiceToRefID": "1",
    "loadID": "4",
    "invoiceDate": "1",
    "toPayUntil": "1",
    "isPayed": "no",
    "name": "1",
    "familyName": "1",
    "salutation": "1",
    "company": "1",
    "phone": "1",
    "mobile": "1",
    "email": "1",
    "street": "1",
    "streetNumber": "1",
    "areaCode": "1",
    "city": "1",
    "country": "1",
    "invoiceToShippingAdress": "1",
    "ShippingStreet": "1",
    "ShippingStreetNumber": "1",
    "ShippingAreaCode": "1",
    "ShippingCity": "2",
    "ShippingCountry": "1",
    "counterOld": "1",
    "counterOldDate": "1",
    "counterNew": "1",
    "counterNewDate": "1",
    "active": "1",
    "comment": "Your mom is nice",
    "invoiceID": "8"
    }
 */
router.put('/invoices', async (req, res, next) => {
    try {
        let input = req.body;
        console.log(input);
        let results = await db.updateInvoice(input.invoiceNumber, input.invoiceTypeID, input.customerRefID, input.invoiceToRefID, input.loadID, input.invoiceDate, input.toPayUntil, input.isPayed, input.name, input.familyName,
            input.salutation, input.company, input.phone, input.mobile, input.email, input.street, input.streetNumber, input.areaCode, input.city, input.country, input.ShippingStreet,
            input.ShippingStreetNumber, input.ShippingAreaCode, input.ShippingCity, input.ShippingCountry, input.counterOld, input.counterOldDate, input.counterNew, input.counterNewDate, input.active, input.comment, input.invoiceID);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/******************
 * Load
 *****************/

/**
 * Get all loads
 */
router.get('/loads', async (req, res, next) => {

    try {
        let results = await db.getAllLoads();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a load by their id
 */
router.get('/loads/:id', async (req, res, next) => {

    try {
        let results = await db.getLoadByID(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Create a new inactive load
 *
 * Example for POST JSON:
 *  {
    "loadTypeID": "1",
    "facilityID": "1",
    "tenantID": "1",
    "invoiceTo": "1",
    "firstInvoice": "null",
    "intervalElectricity": "23",
    "intervalService": "23",
    "comment": "blabla"
    }
 */
router.post('/loads', async (req, res, next) => {
    try {
        let input = req.body;
        console.log(input);
        let results = await db.newInactiveLoad(input.loadTypeID, input.facilityID, input.tenantID, input.invoiceTo,input.firstInvoice,input.intervalElectricity,input.intervalService, input.comment);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


/**
 * Update a load by their load id
 *
 * Example for PUT JSON:
 * {
    "loadTypeID": "1",
    "facilityID": "1",
    "tenantID": "1",
    "invoiceTo": "1",
    "firstInvoice": "null",
    "intervalElectricity": "23",
    "intervalService": "23",
    "comment": "blabla",
    "loadID": "1"
    }
 */
router.put('/loads', async (req, res, next) => {
    try {
        let input = req.body;
        console.log(input);
        let results = await db.updateLoadByID(input.loadTypeID, input.facilityID, input.tenantID, input.invoiceTo,input.firstInvoice,input.intervalElectricity,input.intervalService, input.comment, input.loadID);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
//
// /**
//  * Set a load active by their id
//  *
//  * Example for PUT JSON:
//  * {
//     "loadID": "1",
//     }
//  */
// router.put('/loads/setActive', async (req, res, next) => {
//     try {
//         let input = req.body;
//         console.log(input);
//
//         let results = await db.setLoadActiveByID(input.loadID);
//         res.json(results);
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
//
// });
//
// /**
//  * Set load inactive by their id
//  *
//  * Example for PUT JSON:
//  * {
//     "loadID": "1",
//     }
//  */
// router.put('/loads/setInactive', async (req, res, next) => {
//     try {
//         let input = req.body;
//         console.log(input);
//         let results = await db.setLoadInactiveByID(input.loadID);
//         res.json(results);
//     } catch (e) {
//         console.log(e);
//         res.sendStatus(500);
//     }
//
// });

/******************
 * Loadtype
 *****************/

/**
 * Get all load types
 */
router.get('/loads/types', async (req, res, next) => {

    try {
        let results = await db.loadtype();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a load typ by their id
 */
router.get('/loads/types/:id', async (req, res, next) => {

    try {
        let results = await db.loadtypeByID(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/******************
 * Facility
 *****************/

/**
 * Get all facilities
 */
router.get('/facilities', async (req, res, next) => {

    try {
        let results = await db.facility();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a facility by their id
 */
router.get('/facilities/:id', async (req, res, next) => {

    try {
        let results = await db.facilityByID(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});


/**
 * Create a new facility
 *
 * Example for POST JSON:
 * {
    "administratorID" : "1",
    "designation": "tesrtrefd",
    "street": "Teststrasse",
    "streetNumber": "2",
    "areaCode": "23",
    "city": "Zürich",
    "country": "sdfsd",
    "active": "1",
    "comment": "bab"
    }
 */
router.post('/facilities', async (req, res, next) => {
    try {
        let input = req.body;
        console.log(input);
        let results = await db.newFacility(input.administratorID, input.designation, input.street, input.streetNumber, input.areaCode, input.city, input.country, input.active, input.comment);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Update a facility by their id
 *
 * Example for PUT JSON:
 * {
    "administratorID" : "1",
    "designation": "tesrtrefd",
    "street": "Teststrasse",
    "streetNumber": "2",
    "areaCode": "23",
    "city": "Zürich",
    "country": "sdfsd",
    "active": "1",
    "comment": "bab",
    "facilityID": "10"
    }
 */
router.put('/facilities', async (req, res, next) => {
    try {
        let input = req.body;
        console.log(input);
        let results = await db.updateFacilityByID(input.administratorID, input.designation, input.street, input.streetNumber, input.areaCode, input.city, input.country, input.active, input.comment, input.facilityID);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/******************
 * Invoice Position
 *****************/

// TODO: Invoice Position routes for: Create, Update, Delete

/**
 * Get all invoice positions. Only use when really needed
 */
router.get('/invoices/positions', async (req, res, next) => {

    try {
        let results = await db.invoiceposition();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a specific invoice position
 */
router.get('/invoices/positions/:id', async (req, res, next) => {

    try {
        let results = await db.invoicepositionByID(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get all invoice positions from a specific invoice
 */
router.get('/invoices/:id/positions', async (req, res, next) => {

    try {
        let results = await db.invoicepositionByInvoiceNummer(req.params.id);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a specific invoice position from a specific invoice
 */
router.get('/invoices/:invoiceid/positions/:positionid', async (req, res, next) => {

    try {
        let results = await db.invoicepositionByIDByInvoiceNummer(req.params.invoiceid, req.params.positionid);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }

});

module.exports = router;
