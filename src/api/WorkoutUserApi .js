const express = require('express');
const router = express.Router();
const controller = require('../controllers/WorkoutUserController');

module.exports = function () {
    router.get('/', controller.getAllWorkoutUsers);
    router.get('/:id', controller.getSpecificWorkoutUser);
    router.post('/',controller.addWorkoutUsers );
    router.put('/:id',controller.editWorkoutUsers);
    router.delete('/:id',controller.deleteWorkoutUsers);
    return router;
}