const express = require('express');
const Router = express.Router();
const courseController = require('./../Controllers/CourseController');

Router.get('/', courseController.getAllCourses);
Router.post('/filter', courseController.filterCourses);
Router.post('/search', courseController.searchCourses);
Router.post('/', courseController.createCourse);

module.exports = Router;
