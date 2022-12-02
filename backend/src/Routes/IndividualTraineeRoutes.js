const express = require('express');
const Router = express.Router();
const IndividualTraineeController = require('./../Controllers/IndividualTraineeContoller');

Router.get('/courses', IndividualTraineeController.getMyCourses);
Router.post('/test/submit', IndividualTraineeController.submitTest);

module.exports = Router;
