const express = require('express');
const Router = express.Router();
const corporateTraineeController = require('./../Controllers/CorporateTraineeController');

Router.post(
  '/newCorporateTrainee',
  corporateTraineeController.createNewCorporateTrainee
);
Router.get(
  '/registeredCoursesCorporate',
  corporateTraineeController.viewRegisteredCourse
);
Router.post(
  '/registerToCourseCorporate',
  corporateTraineeController.registerToCourse
);
Router.post(
  '/addCourseReviewCorporate',
  corporateTraineeController.reviewCourseCorporate
);
Router.post(
  '/addInstructorReviewCorporate',
  corporateTraineeController.reviewInstructorCorporate
);

Router.get('/courses', corporateTraineeController.getMyCourses);
Router.post('/test/submit', corporateTraineeController.submitTest);

module.exports = Router;
