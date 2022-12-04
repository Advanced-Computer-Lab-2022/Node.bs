const CorporateTrainee = require('./../Models/CorporateTrainee');
const mongoose = require('mongoose');
const Course = require('./../Models/Course');
const Submission = require('./../Models/Submission');
const LearningResource = require('./../Models/LearningResource');

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

  res.status(200).json(updatedInstrcutor);
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

const getMyCourses = async (req, res) => {
  const myId = req.query.id;
  console.log(req.query.id);
  try {
    const user = await CorporateTrainee.findById(myId)
      .populate({
        path: 'registeredCourses.submissions',
        populate: { path: 'test', populate: { path: 'exercises' } },
      })
      .populate({
        path: 'registeredCourses.course',
        populate: { path: 'instructors' },
      })
      .populate({
        path: 'registeredCourses.course',
        populate: {
          path: 'subtitles',
          populate: {
            path: 'lessons',
            populate: {
              path: 'learningResources test',
              populate: {
                path: 'exercises',
                strictPopulate: false,
              },
            },
          },
        },
      });

    if (user) {
      //   console.log(user.registeredCourses);
      //   console.log(user.registeredCourses[0].course.subtitles[0].lessons);
      res.status(200).json(user.registeredCourses);
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
    console.log(e);
  }
};
const submitTest = async (req, res) => {
  try {
    const submission = await Submission.create(req.body.submission);
    let trainee = await CorporateTrainee.findById(req.body.traineeId);
    let registeredCourses = trainee.registeredCourses;
    for (let registeredCourse in registeredCourses) {
      if (
        registeredCourses[registeredCourse].course.equals(req.body.courseId)
      ) {
        registeredCourses[registeredCourse].submissions.push(submission._id);
      }
    }
    const response = await CorporateTrainee.findOneAndUpdate(
      { _id: req.body.traineeId },
      { registeredCourses }
    );
    console.log(submission);
    console.log(response);
    if (response) {
      res.status(200).json(response);
    } else {
      res.status(404).json({ message: 'user not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'some unexpected error occured' });
  }
};

module.exports = {
  getMyCourses,
  submitTest,
  reviewCourseCorporate,
  registerToCourse,
  viewRegisteredCourse,
  createNewCorporateTrainee,
  reviewInstructorCorporate,
};
