const express = require('express');
const Router = express.Router();
const courseController = require('./../Controllers/CourseController');

Router.get('/', courseController.getAllCourses);
Router.post('/filter', courseController.filterCourses);
Router.post('/search', courseController.searchCourses);
Router.post('/', courseController.createCourse);
Router.get('/byId', courseController.getCourseById);
Router.put('/', courseController.updateCourse);
Router.put('/subtitle', courseController.updateSubtitle);
Router.post('/lesson', courseController.createLesson);
Router.post('/addresource', courseController.createResource);
Router.post('/courseReviews', courseController.getReviews);
Router.post('/addReport', courseController.addReport)

module.exports = Router;
