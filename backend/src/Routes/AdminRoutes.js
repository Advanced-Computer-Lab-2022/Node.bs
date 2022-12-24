const express = require('express');
const Router = express.Router();
const adminController = require('./../Controllers/AdminController');

Router.post('/', adminController.createAdmin);
Router.post('/instructor', adminController.createInstructor);
Router.post('/corporate', adminController.createCorporateTrainee);
Router.post('/resetPassword', adminController.resetPassword);
Router.post('/markReportAsResolved', adminController.markReportsAsResolved);
Router.post('/markReportAsPending', adminController.markReportsAsPending);
Router.post('/getCorporateTrainees', adminController.getCorporateTrainees);
Router.post('/grantAccessToCourse', adminController.grantAccessToCourse);
Router.post('/searchCourses', adminController.returnCoursesFromSearch);
Router.post('/applyPromotion', adminController.applyPromotionOnCourses);
Router.post('/refundRequests', adminController.getRefundRequests);
module.exports = Router;
