
const express = require('express');
const router = express.Router();
const controller = require('../controllers/StockItemsController');

module.exports = function () {
    router.get('/', controller.getAllStockItem);
    router.get('/:id', controller.getSpecificStockCategoryItem);
    router.post('/',controller.addStockItem);
    router.put('/:id',controller.editSpecificStockItem);
    router.delete('/:id',controller.deleteSpecificStockCategoryItem );
    // router.post('/mail/send',controller.MailSend);
    return router;
}
