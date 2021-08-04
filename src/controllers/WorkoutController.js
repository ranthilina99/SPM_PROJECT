const Workouts = require('../models/Workout');

const addWorkouts = async (req, res) => {
    if (req.body) {
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
        .populate('workout_users', 'username email')
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
            .populate('workout_users', 'username email')
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

module.exports = {
    addWorkouts,
    getAllWorkouts,
    getSpecificWorkout,
    editWorkouts,
    deleteWorkouts
};