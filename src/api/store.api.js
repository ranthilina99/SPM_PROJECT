const express = require('express');
const router = express.Router();
const controller = require('../controllers/store.controller');

module.exports = function () {

    router.get('/', controller.getAllStores);
    router.get('/:id', controller.getSpecificStore);
    router.post('/',controller.createStore);
    router.put('/:id',controller.editStore);
    router.delete('/:id',controller.deleteStore);
    return router;

}