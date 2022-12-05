const express = require('express');
const Router = express.Router();
const individualTraineeController = require('./../Controllers/IndividualTraineeContoller');

Router.post(
  '/newIndividualTrainee',
  individualTraineeController.createNewIndividualTrainee
);
Router.get(
  '/registeredCoursesIndividual',
  individualTraineeController.viewRegisteredCourse
);
Router.post(
  '/registerToCourseIndividual',
  individualTraineeController.registerToCourse
);
Router.post(
  '/addCourseReviewIndividual',
  individualTraineeController.reviewCourseIndividual
);
Router.post(
  '/addInstructorReviewIndividual',
  individualTraineeController.reviewInstructorIndividual
);

Router.get('/courses', individualTraineeController.getMyCourses);
Router.post('/test/submit', individualTraineeController.submitTest);
Router.patch('/:id', individualTraineeController.updateIndividualPassword);

module.exports = Router;
