
const mongoose=require('mongoose');

const SupplierSchema=new mongoose.Schema({
    supplier_name:{type:String,required:true, trim:true },
    supplier_email:{type:String,required:true, trim:true },
    supplier_address:{type:String,required:false, trim:true },
    supplier_phone:{type: Number, default: false },
},{
    timestamps:true
});

const Suppliers = mongoose.model('Suppliers', SupplierSchema);
module.exports = Suppliers;
