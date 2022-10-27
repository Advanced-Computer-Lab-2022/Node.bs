const express = require('express');
const Router = express.Router();
const adminController = require('./../Controllers/AdminController');

Router.post('/', adminController.createAdmin);
Router.post('/instructor', adminController.createInstructor);
Router.post('/corporate', adminController.createCorporateTrainee);

module.exports = Router;
