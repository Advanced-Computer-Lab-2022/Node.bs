const express = require('express');
const Router = express.Router();
const courseController = require('./../Controllers/CourseController');

Router.get('/', courseController.getAllCourses);
Router.get('/filter', courseController.filterCourses);
Router.get('/search', courseController.searchCourses);
Router.post('/', courseController.createCourse);

module.exports = Router;
