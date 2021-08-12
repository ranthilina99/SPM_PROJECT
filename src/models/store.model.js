const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    itemName: { type: String, required: true, trim: true },
    itemDescription: { type: String, required: true, trim: true },
    itemAmount: { type: Number, required: true },
    itemQTY: { type: Number, required: true },
    itemImage: { type: String },
    employee: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'employee'}
});

const Store = mongoose.model('store', StoreSchema);
module.exports = Store;