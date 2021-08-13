const Workouts = require('../models/Workout');

const addWorkouts = async (req, res) => {
    if (req.body) {
        console.log(req.body);
        const workout = new Workouts(req.body);
        await workout.save()
            .then(data => {
                res.status(200).send({ data: data });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getAllWorkouts = async (req, res) => {

    await Workouts.find()
        //.populate('workout_users', 'username email')
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getSpecificWorkout = async (req, res) => {
    if (req.params && req.params.id) {
        await Workouts.findById(req.params.id)
            //.populate('workout_users', 'username email')
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const editWorkouts = async (req, res) => {
    if (req.params && req.params.id) {

        const updated = req.body;

        await Workouts.findByIdAndUpdate(req.params.id,updated)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const deleteWorkouts = async (req, res) => {
    if (req.params && req.params.id) {

        await Workouts.findByIdAndDelete(req.params.id)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });
    }
}

const getSpecificCreatorWorkout = async (req, res) => {


    await Workouts.find({workout_creator:req.params.id})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const getChosenWorkout = async (req, res) => {

    let score = parseInt(req.params.id);
    let level;

    console.log(score);


    if(score <= 5){
        level =  '1';
    }else if(score <=10){
        level = '2';
    }else if(score <=15){
        level = '3';
    }else if(score <=20){
        level = '4';
    }else {
        level = '5';
    }

    console.log(level);

    await Workouts.find({workout_level:level})
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}

const addUsers = async (req, res) => {
    if (req.params) {

        const uID = req.body.userId;

        const post = await Workouts.findById(req.body.workoutId);

        await post.workout_users.push(uID);

        await Workouts.findByIdAndUpdate(req.body.workoutId,post)
            .then(response => {
                res.status(200).send({ data: response });
            })
            .catch(error => {
                res.status(500).send({ error: error.message });
            });

    }
}

module.exports = {
    addWorkouts,
    getAllWorkouts,
    getSpecificWorkout,
    editWorkouts,
    deleteWorkouts,
    getSpecificCreatorWorkout,
    getChosenWorkout,
    addUsers
};