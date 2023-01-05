const express = require('express');
const Router = express.Router();
const instructorController = require('./../Controllers/InstructorController');

Router.post('/instructorReviews', instructorController.getReviews);
Router.post('/addTest', instructorController.createTest);
Router.patch('/:id', instructorController.updateInstructorPassword);
Router.patch('/:id', instructorController.updateInstructorOverview);
Router.patch('/:id', instructorController.updateInstructorTerms);
Router.get('/byId', instructorController.getInstructorById);
Router.post('/reportsIssued', instructorController.getInstructorReportsIssued);
Router.post('/getMoneyOwedPerMonth', instructorController.getMoneyOwedPerMonth);
Router.post('/updateOverview', instructorController.updateOverview);
Router.post('/updatePassword', instructorController.updatePassword);
module.exports = Router;
