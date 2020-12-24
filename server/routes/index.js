const express = require('express');
const db = require('../db');
const router = express.Router();

/******************
 * User
 *****************/

// TODO: Change singular into plural throughout in the route names
// TODO: Fix spelling and keep code consistent with formatting and scheme

// TODO: User routes for: Create, Update, Delete

/**
 * Get all users
 */
router.get('/user', async (req, res,next) => {

    try {
        let results = await db.user();
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a specific user by their id
 */
router.get('/user/:id', async (req, res,next) => {

    try {
        let results = await db.userByID(req.params.id);
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/******************
 * Usertype
 *****************/

// TODO: Usertype routes for: Create, Update, Delete

/**
 * Get all user types
 */
router.get('/usertype', async (req, res,next) => {

    try {
        let results = await db.usertype();
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a specific user type by their id
 */
router.get('/usertype/:id', async (req, res,next) => {

    try {
        let results = await db.usertypeByID(req.params.id);
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/******************
 * Invoice
 *****************/

// TODO: Invoice routes for: Create, Update, Delete

/**
 * Get all invoices
 */
router.get('/invoice', async (req, res,next) => {

    try {
        let results = await db.invoice();
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a specific invoice by their id
 */
router.get('/invoice/:id', async (req, res,next) => {

    try {
        let results = await db.invoiceByID(req.params.id);
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/******************
 * Invoice Type
 *****************/

// TODO: Invoicetype routes for: Create, Update, Delete

/**
 * Get all invoice types
 */
router.get('/invoicetype', async (req, res,next) => {

    try {
        let results = await db.invoicetype();
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a invoice type by their id
 */
router.get('/invoicetype/:id', async (req, res,next) => {

    try {
        let results = await db.invoicetypeByID(req.params.id);
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/******************
 * Load
 *****************/

// TODO: Load routes for: Create, Update, Delete

/**
 * Get all loads
 */
router.get('/load', async (req, res,next) => {

    try {
        let results = await db.load();
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a load by their id
 */
router.get('/load/:id', async (req, res,next) => {

    try {
        let results = await db.loadByID(req.params.id);
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/******************
 * Loadtype
 *****************/

// TODO: Loadtype routes for: Create, Update, Delete

/**
 * Get all load types
 */
router.get('/loadtype', async (req, res,next) => {

    try {
        let results = await db.loadtype();
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a load typ by their id
 */
router.get('/loadtype/:id', async (req, res,next) => {

    try {
        let results = await db.loadtypeByID(req.params.id);
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/******************
 * Facility
 *****************/

// TODO: Facility routes for: Create, Update, Delete

/**
 * Get all facilities
 */
router.get('/facility', async (req, res,next) => {

    try {
        let results = await db.facility();
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a facility by their id
 */
router.get('/facility/:id', async (req, res,next) => {

    try {
        let results = await db.facilityByID(req.params.id);
        res.json(results);
    } catch (e){
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
router.get('/invoiceposition', async (req, res,next) => {

    try {
        let results = await db.invoiceposition();
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a specific invoice position
 */
router.get('/invoiceposition/:id', async (req, res,next) => {

    try {
        let results = await db.invoicepositionByID(req.params.id);
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get all invoice positions from a specific invoice
 */
router.get('/invoice/:id/invoiceposition', async (req, res,next) => {

    try {
        let results = await db.invoicepositionByInvoiceNummer(req.params.id);
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

/**
 * Get a specific invoice position from a specific invoice
 */
router.get('/invoice/:invoiceid/invoiceposition/:positionid', async (req, res,next) => {

    try {
        let results = await db.invoicepositionByIDByInvoiceNummer(req.params.invoiceid,req.params.positionid);
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

module.exports = router;
