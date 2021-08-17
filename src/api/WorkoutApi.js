const express = require('express');
const router = express.Router();
const controller = require('../controllers/WorkoutController');

module.exports = function () {
    router.get('/', controller.getAllWorkouts);
    router.get('/:id', controller.getSpecificWorkout);
    router.get('/creator/:id', controller.getSpecificCreatorWorkout);
    router.get('/chosen/:id', controller.getChosenWorkout);
    router.post('/',controller.addWorkouts );
    router.patch('/addUsers',controller.addUsers );
    router.put('/:id',controller.editWorkouts);
    router.delete('/:id',controller.deleteWorkouts);
    return router;
}