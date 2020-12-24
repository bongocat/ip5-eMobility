const express = require('express');
const db = require('../db');
const router = express.Router();

/******************
 * User
 *****************/

router.get('/user', async (req, res,next) => {

    try {
        let results = await db.user();
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

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

router.get('/usertype', async (req, res,next) => {

    try {
        let results = await db.usertype();
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

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

router.get('/invoice', async (req, res,next) => {

    try {
        let results = await db.invoice();
        res.json(results);
    } catch (e){
        console.log(e);
        res.sendStatus(500);
    }

});

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
 * get a load by their id
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
 * get a load typ by their ic
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
