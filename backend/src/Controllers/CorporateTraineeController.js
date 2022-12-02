const CorporateTrainee = require('./../Models/CorporateTrainee');
const mongoose = require('mongoose');
const Course = require('./../Models/Course');

const reviewInstructorCorporate = async (req, res) => {
  const instructorId = req.body.instructorId;

  const corporateTraineeId = req.body.corporateTraineeId;
  const newReview = req.body.review;

  const newReviewFinalForm = {
    corporateTrainee: corporateTraineeId,
    rating: newReview.rating,
    review: newReview.review,
  };

  const instructorReturned = await Instructor.findOneById(instructorId);
  const instructorOldReviews = await instructorReturned.corporateReviews;

  const updatedReviews = instructorOldReviews.push(newReviewFinalForm);

  const updatedInstrcutor = await Instructor.findByIdAndUpdate(
    { id: instructorId },
    { corporateReviews: updatedReviews }
  );

  res.status(200).json(updatedInstrcutor)
};

const createNewCorporateTrainee = async (req, res) => {
  const newCorporateTrainee = req.body.newCorporateTrainee;
  console.log(newCorporateTrainee);

  const insertion = await CorporateTrainee.create(newCorporateTrainee);

  const corps = await CorporateTrainee.find();

  console.log(insertion._id);
  console.log();

  return res.status(200).json(insertion);
};
const reviewCourseCorporate = async (req, res) => {
  const courseId = req.body.courseId;

  const corporateTraineeId = req.body.corporateTraineeId;
  const newReview = req.body.review;

  const newReviewFinalForm = {
    corporateTrainee: corporateTraineeId,
    rating: newReview.rating,
    review: newReview.review,
  };

  const courseReturned = await Course.findOneById(courseId);
  const courseOldReviews = courseReturned.corporateReviews;

  const updatedReviews = courseOldReviews.push(newReviewFinalForm);

  const updatedCourse = await Course.findByIdAndUpdate(
    { id: courseId },
    { corporateReviews: updatedReviews }
  );

  res.status(200).json(updatedCourse);
};

const registerToCourse = async (req, res) => {
  const corpoateTraineeId = req.body.corporateTraineeId;
  const courseId = req.body.courseId;
  const newCourse = { course: courseId, submissions: [], progress: 0 };

  const trainee = await CorporateTrainee.findById(corpoateTraineeId);
  console.log(trainee);
  let coursesOfTrainee = trainee.registeredCourses;

  coursesOfTrainee.push(newCourse);

  console.log(coursesOfTrainee);

  const returnedQuery = await CorporateTrainee.findOneAndUpdate(
    { _id: corpoateTraineeId },
    { registeredCourses: coursesOfTrainee }
  );

  return res.status(200).json(returnedQuery);
};

const viewRegisteredCourse = async (req, res) => {
  const corporateTraineeId = req.body.corporateTraineeId;
  const trainee = await CorporateTrainee.findById(corporateTraineeId);
  //   const courses = await Course.find();

  const registeredCourses = trainee.registeredCourses;

  console.log('function working');

  return res.status(200).json(registeredCourses);
};

module.exports = {
  reviewCourseCorporate,
  registerToCourse,
  viewRegisteredCourse,
  createNewCorporateTrainee,
  reviewInstructorCorporate
};