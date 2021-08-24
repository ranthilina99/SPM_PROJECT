const mongoose=require('mongoose');

const WorkoutSchema=new mongoose.Schema({
    workout_name:{type:String, required:true, trim:true},
    workout_fName:{type:String, required:true, trim:true},
    workout_lName:{type:String, required:true, trim:true},
    workout_theme:{type:String, required:true, trim:true},
    workout_description:{type:String, required:true, trim:true},
    workout_schedule:{type:String, required:true, trim:true},
    workout_diet:{type:String, required:true, trim:true},
    workout_creator:{type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'},
    workout_users:[{type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Users'}],
    workout_price:{type:Number, required:true},
    workout_level:{type:String, required:true, trim:true},
    workout_img:{type:String},

});
const Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;