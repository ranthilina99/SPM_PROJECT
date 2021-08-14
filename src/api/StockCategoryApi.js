
const express = require('express');
const router = express.Router();
const controller = require('../controllers/StockCategoryController');

module.exports = function () {
    router.get('/', controller.getAllStockCategory);
    router.get('/:id', controller.getSpecificStockCategory);
    router.post('/',controller.addStockCategory);
    router.put('/:id',controller.editSpecificStockCategory);
    router.delete('/:id',controller.deleteSpecificStockCategory);
    router.patch('/item',controller.addItemsToCategories);
    // router.post('/mail/send',controller.MailSend);
    return router;
}
