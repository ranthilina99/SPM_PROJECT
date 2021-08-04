const express = require('express');
const router = express.Router();
const controller = require('../controllers/WorkoutController');

module.exports = function () {
    router.get('/', controller.getAllWorkouts);
    router.get('/:id', controller.getSpecificWorkout);
    router.post('/',controller.addWorkouts );
    router.put('/:id',controller.editWorkouts);
    router.delete('/:id',controller.deleteWorkouts);
    return router;
}