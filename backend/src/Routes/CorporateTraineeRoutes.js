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
Router.patch('/:id', corporateTraineeController.updateCorporatePassword);

Router.post(
  '/reportsIssued',
  corporateTraineeController.getCorporateTraineeReportsIssued
);

Router.post('/requestCourse', corporateTraineeController.requestAccessToCourse);

Router.post(
  '/markResourceAsSeen',
  corporateTraineeController.markResourceAsSeen
);

Router.post('/getTrainee', corporateTraineeController.getTrainee);

module.exports = Router;
