const express = require('express');
const Router = express.Router();
const adminController = require('./../Controllers/AdminController');
const { authMiddleware } = require('../Middleware/authMiddleware');

Router.post('/', authMiddleware('admin'), adminController.createAdmin);
Router.post(
  '/instructor',
  authMiddleware('admin'),
  adminController.createInstructor
);
Router.post(
  '/corporate',
  authMiddleware('admin'),
  adminController.createCorporateTrainee
);
Router.post('/resetPassword', adminController.resetPassword);
Router.post(
  '/markReportAsResolved',
  authMiddleware('admin'),
  adminController.markReportsAsResolved
);
Router.post(
  '/markReportAsPending',
  authMiddleware('admin'),
  adminController.markReportsAsPending
);
Router.post('/getCorporateTrainees', adminController.getCorporateTrainees);
Router.post(
  '/grantAccessToCourse',
  authMiddleware('admin'),
  adminController.grantAccessToCourse
);
Router.post('/searchCourses', adminController.returnCoursesFromSearch);
Router.post(
  '/applyPromotion',
  authMiddleware('admin'),
  adminController.applyPromotionOnCourses
);
Router.post('/refundRequests', adminController.getRefundRequests);
Router.post(
  '/grantRefund',
  authMiddleware('admin'),
  adminController.grantRefundToIndividualTrainee
);
Router.post('/sendCertificate', adminController.sendCertificate);
module.exports = Router;
