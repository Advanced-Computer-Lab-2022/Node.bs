const IndividualTrainee = require('./../Models/IndividualTrainee');
const mongoose = require('mongoose');
const Course = require('./../Models/Course');


const reviewInstructorIndividual = async (req, res) => {
  const instructorId = req.body.instructorId;

  const individualTraineeId = req.body.individualTraineeId;
  const newReview = req.body.review;

  const newReviewFinalForm = {
    individualTrainee: individualTraineeId,
    rating: newReview.rating,
    review: newReview.review,
  };

  const instructorReturned = await Instructor.findOneById(instructorId);
  const instructorOldReviews = await instructorReturned.individualReviews;

  const updatedReviews = instructorOldReviews.push(newReviewFinalForm);

  const updatedInstrcutor = await Instructor.findByIdAndUpdate(
    { id: instructorId },
    { individualReviews: updatedReviews }
  );

  res.status(200).json(updatedInstrcutor)
};

const reviewCourseIndividual = async (req, res) => {
  const courseId = req.body.courseId;

  const individualTraineeId = req.body.individualTraineeId;
  const newReview = req.body.review;

  const newReviewFinalForm = {
    individualTrainee: individualTraineeId,
    rating: newReview.rating,
    review: newReview.review,
  };

  const courseReturned = await Course.findOneById(courseId);
  const courseOldReviews = await courseReturned.individualReviews;

  const updatedReviews = courseOldReviews.push(newReviewFinalForm);

  const updatedCourse = await Course.findByIdAndUpdate(
    { id: courseId },
    { individualReviews: updatedReviews }
  );

  res.status(200).json(updatedCourse)
};

const createNewIndividualTrainee = async (req, res) => {
  const newIndividualTrainee = req.body.newIndividualTrainee;
  console.log(newIndividualTrainee);

  const insertion = await IndividualTrainee.create(newIndividualTrainee);

  const indvids = await IndividualTrainee.find();

  console.log(insertion._id);
  console.log();

  return res.status(200).json(insertion);
};
const viewRegisteredCourse = async (req, res) => {
  const individualTraineeId = req.body.individualTraineeId;
  const returnedQuery = await IndividualTrainee.find();
  const courses = await Course.find();

  console.log('function working');

  return res.status(200).json(courses);
};

const registerToCourse = async (req, res) => {
  const individualTraineeId = req.body.individualTraineeId;
  const courseId = req.body.courseId;
  const newCourse = { course: courseId, submissions: [], progress: 0 };

  const trainee = await IndividualTrainee.findById(individualTraineeId);
  console.log(trainee);
  let coursesOfTrainee = trainee.registeredCourses;

  coursesOfTrainee.push(newCourse);

  console.log(coursesOfTrainee);

  const returnedQuery = await IndividualTrainee.findOneAndUpdate(
    { _id: individualTraineeId },
    { registeredCourses: coursesOfTrainee }
  );

  return res.status(200).json(returnedQuery);
};

module.exports = {
  viewRegisteredCourse,
  createNewIndividualTrainee,
  registerToCourse,
  reviewCourseIndividual,
  reviewInstructorIndividual
};

//eminem userId ...
// 638796ae23b3b73229cb811b

//theory of computation Course
//6383839a91e12ea9533bcc71

//accounting course
//635f37d1de75e20effb14fc5

//Dr. Haythem Ismail
//635f37bcde75e20effb14fc3
