const mongoose=require('mongoose');

const WorkoutUserSchema=new mongoose.Schema({
    workoutUser_id:{type: mongoose.Schema.Types.ObjectId, required:true, ref: 'Users'},
    workout_id:{type: mongoose.Schema.Types.ObjectId, required:true, ref: 'Workout'}
},{
    timestamps:true
});


const WorkoutUsers = mongoose.model('WorkoutUser', WorkoutUserSchema);
module.exports = WorkoutUsers;