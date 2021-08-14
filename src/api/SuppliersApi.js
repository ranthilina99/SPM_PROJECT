
const express = require('express');
const router = express.Router();
const controller = require('../controllers/SupplierController');

module.exports = function () {
    router.get('/', controller.getAllSuppliers);
    router.get('/:id', controller.getSpecificSupplier);
    router.post('/',controller.addSupplier);
    router.put('/:id',controller.editSpecificSupplier);
    router.delete('/:id',controller.deleteSpecificSupplier );
    // router.post('/mail/send',controller.MailSend);
    return router;
}
