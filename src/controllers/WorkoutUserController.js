const WorkoutUser = require('../models/WorkoutUser');

const addWorkoutUsers = async (req, res) => {
    if (req.body) {
        const workoutUser = new WorkoutUser(req.body);
        await workoutUser.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllWorkoutUsers = async (req, res) => {

    await WorkoutUser.find()
        .populate('workout_users', 'username email')
        .populate('workout_workouts', 'workout_name workout_theme workout_creator.username workout_users workout_description')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSpecificWorkoutUser = async (req, res) => {
    if (req.params && req.params.id) {
        await WorkoutUser.findById(req.params.id)
            //.populate('workout_users', 'username email')
            .populate('workout_workouts', 'workout_name workout_theme workout_description workout_schedule workout_diet workout_img')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const editWorkoutUsers = async (req, res) => {
    if (req.params && req.params.id) {

        const updated = req.body;

        await WorkoutUser.findByIdAndUpdate(req.params.id,updated)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteWorkoutUsers = async (req, res) => {
    if (req.params && req.params.id) {

        await WorkoutUser.findByIdAndDelete(req.params.id)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getSpecificUsersWorkout = async (req, res) => {
    await WorkoutUser.find({workoutUser_id:req.params.id})
        //.populate('workout_workouts', 'workout_name workout_theme workout_description workout_schedule workout_diet workout_img')
        .then(data => {
            let exist = false;
            if(data[0]._id !== undefined){
                exist = true;
            }

            res.status(200).send({ data: data, exists:exist});
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

module.exports = {
    addWorkoutUsers,
    getAllWorkoutUsers,
    getSpecificWorkoutUser,
    editWorkoutUsers,
    deleteWorkoutUsers,
    getSpecificUsersWorkout
};