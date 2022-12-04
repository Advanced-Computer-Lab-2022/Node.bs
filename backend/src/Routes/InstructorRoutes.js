const express = require('express');
const Router = express.Router();
const instructorController = require('./../Controllers/InstructorController');

Router.get('/instructorReviews', instructorController.getReviews);
Router.post('/addTest', instructorController.createTest);

module.exports = Router;
