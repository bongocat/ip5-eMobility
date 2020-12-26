const express = require('express');
const db = require('../db');
const router = express.Router();

/******************
 * User
 *****************/

// TODO: Fix spelling and keep code consistent with formatting and scheme

// TODO: User routes for: Create, Update, Delete

/**
 * Get all users
 */
router.get('/users', async (req, res,next) => {

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
router.get('/users/:id', async (req, res,next) => {

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
router.get('/usertypes', async (req, res,next) => {

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
router.get('/usertypes/:id', async (req, res,next) => {

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
router.get('/invoices', async (req, res,next) => {

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
router.get('/invoices/:id', async (req, res,next) => {

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
router.get('/invoicetypes', async (req, res,next) => {

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
router.get('/invoicetypes/:id', async (req, res,next) => {

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
router.get('/loads', async (req, res,next) => {

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
router.get('/loads/:id', async (req, res,next) => {

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
router.get('/loadtypes', async (req, res,next) => {

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
router.get('/loadtypes/:id', async (req, res,next) => {

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
router.get('/facilities', async (req, res,next) => {

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
router.get('/facilities/:id', async (req, res,next) => {

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
router.get('/invoicepositions', async (req, res,next) => {

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
router.get('/invoicepositions/:id', async (req, res,next) => {

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
router.get('/invoices/:id/invoicepositions', async (req, res,next) => {

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
router.get('/invoices/:invoiceid/invoicepositions/:positionid', async (req, res,next) => {

    try {
        let results = await db.invoicepositionByIDByInvoiceNummer(req.params.invoiceid,req.params.positionid);
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

module.exports = router;
