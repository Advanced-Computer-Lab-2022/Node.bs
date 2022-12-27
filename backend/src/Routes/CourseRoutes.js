const express = require('express');
const { authMiddleware } = require('../Middleware/authMiddleware');
const Router = express.Router();
const courseController = require('./../Controllers/CourseController');

Router.get('/', courseController.getAllCourses);
Router.post('/filter', courseController.filterCourses);
Router.post('/search', courseController.searchCourses);
Router.post('/', authMiddleware('instructor'), courseController.createCourse);
Router.get('/byId', courseController.getCourseById);
Router.put('/', authMiddleware('instructor'), courseController.updateCourse);
Router.put(
  '/subtitle',
  authMiddleware('instructor'),
  courseController.updateSubtitle
);
Router.post(
  '/lesson',
  authMiddleware('instructor'),
  courseController.createLesson
);
Router.post(
  '/addresource',
  authMiddleware('instructor'),
  courseController.createResource
);
Router.post('/courseReviews', courseController.getReviews);

module.exports = Router;
