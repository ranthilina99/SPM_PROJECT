
const mongoose=require('mongoose');

const StockCategorySchema=new mongoose.Schema({
    stock_items:[{ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'stockItems'}],
    category_topic:{type:String,required:true, trim:true },
    category_date:{type:String},
    category_description:{type:String,required:true, trim:true },
    category_image:{type: String},
    },
    {
    timestamps:true
});

const StockCategory = mongoose.model('StockCategory', StockCategorySchema);
module.exports = StockCategory;
