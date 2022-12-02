const express = require('express');
const Router = express.Router();
const corporateTraineeController = require('./../Controllers/CorporateTraineeController');

Router.get('/courses', corporateTraineeController.getMyCourses);
Router.post('/test/submit', corporateTraineeController.submitTest);

module.exports = Router;
