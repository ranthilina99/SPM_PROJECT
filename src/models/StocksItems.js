const mongoose=require('mongoose');

const StockItemsSchema=new mongoose.Schema({
    item_name:{type:String},
    item_quantity:{type:Number,required:true},
    item_price:{type:Number,required:true},
    item_date:{type:Date},
    item_suppliers:{type:String},
    item_image: {type: String,},
    item_description:{type:String},

});
const stockItems = mongoose.model('stockItems', StockItemsSchema);
module.exports = stockItems;

