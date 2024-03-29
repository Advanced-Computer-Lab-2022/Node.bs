const CorporateTrainee = require('./../Models/CorporateTrainee');
const mongoose = require('mongoose');
const Course = require('./../Models/Course');
const Submission = require('./../Models/Submission');
const LearningResource = require('./../Models/LearningResource');
const Instructor = require('./../Models/Instructor');
const Report = require('./../Models/Report');

const reviewInstructorCorporate = async (req, res) => {
  const instructorId = req.body.instructorId;

  const corporateTraineeId = req.body.user;
  const newReview = req.body.review;

  const newReviewFinalForm = {
    user: corporateTraineeId,
    rating: newReview.rating,
    review: newReview.review,
  };

  const instructorReturned = await Instructor.findById(instructorId);
  const instructorOldReviews = await instructorReturned.corporateReviews;

  instructorOldReviews.push(newReviewFinalForm);

  let newRating = 0;
  instructorOldReviews.forEach((review) => {
    newRating += review.rating;
  });
  instructorReturned.individualReviews.forEach((review) => {
    newRating += review.rating;
  });

  newRating = Math.floor(
    newRating /
      (instructorOldReviews.length +
        instructorReturned.individualReviews.length)
  );

  const updatedInstrcutor = await Instructor.findByIdAndUpdate(
    { _id: instructorId },
    { corporateReviews: instructorOldReviews, rating: newRating }
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

  const courseReturned = await Course.findById(courseId);
  const courseOldReviews = courseReturned.corporateReviews;

  courseOldReviews.push(newReviewFinalForm);
  let newRating = 0;
  courseOldReviews.forEach((review) => {
    newRating += review.rating;
  });
  courseReturned.individualReviews.forEach((review) => {
    newRating += review.rating;
  });

  newRating = Math.floor(
    newRating /
      (courseOldReviews.length + courseReturned.individualReviews.length)
  );

  const updatedCourse = await Course.findByIdAndUpdate(
    { _id: courseId },
    { corporateReviews: courseOldReviews, rating: newRating }
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

  await Course.findByIdAndUpdate(courseId, {
    $inc: { numberOfRegisteredTrainees: 1 },
  });

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
const updateCorporatePassword = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'This ID is false' });
  }

  const corporateTrainee = await CorporateTrainee.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!corporateTrainee) {
    return res.status(400).json({ error: 'Corporate trainee not found' });
  }
  res.status(200).json(corporateTrainee);
};

/////////////////////REPORTS///////////////////////////

const getCorporateTraineeReportsIssued = async (req, res) => {
  const corporateTraineeId = req.body.corporateTraineeId;
  console.log('corporateTraineeId: ' + corporateTraineeId);

  const returnedQuery = await Report.find({
    corporateTrainee: corporateTraineeId,
  });

  if (returnedQuery) {
    return res.status(200).json(returnedQuery);
  } else {
    res.status(400).json();
  }
};

///////////////////REQUEST ACCESS/////////////////

const requestAccessToCourse = async (req, res) => {
  const corporateTraineeId = req.body.corporateTraineeId;
  const courseId = req.body.courseId;

  const corporateTrainee = await CorporateTrainee.findOne({
    _id: corporateTraineeId,
  });

  console.log('I AM WORKING!!!');
  console.log('CORPT: ' + corporateTraineeId);
  console.log('courseID' + courseId);

  const checkIfAlreadyRequested = await CorporateTrainee.findOne({
    _id: corporateTraineeId,
    registeredCourses: { $elemMatch: { courseId } },
  });
  console.log('already requested ' + checkIfAlreadyRequested);
  if (corporateTrainee.requestedCourses) {
    //array 'requestedCourses' does exist
    let currentRequests = corporateTrainee.requestedCourses;
    const newCourse = { courseId };
    console.log(currentRequests);
    currentRequests.push(courseId);
    const updatedRequests = await CorporateTrainee.findOneAndUpdate(
      { _id: corporateTraineeId },
      { requestedCourses: currentRequests }
    );

    if (updatedRequests) {
      return res.status(200).json(updatedRequests);
    } else {
      res.status(400).json('something went wrong!');
    }
  } else {
    // array 'requestedCourses' does not exist
    const updatedRequests = await CorporateTrainee.findOneAndUpdate(
      { _id: corporateTraineeId },
      { requestedCourses: [courseId] }
    );
    if (updatedRequests) {
      return res.status(200).json(updatedRequests);
    } else {
      res.status(400).json('something went wrong!');
    }
  }
};

const markResourceAsSeen = async (req, res) => {
  try {
    const resourceId = req.body.resourceId;
    let trainee = await CorporateTrainee.findById(req.body.traineeId);
    let registeredCourses = trainee.registeredCourses;
    for (let registeredCourse in registeredCourses) {
      if (
        registeredCourses[registeredCourse].course.equals(req.body.courseId)
      ) {
        registeredCourses[registeredCourse].seen[resourceId] = true;
      }
    }
    const response = await CorporateTrainee.findOneAndUpdate(
      { _id: req.body.traineeId },
      { registeredCourses }
    );

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

const getTrainee = async (req, res) => {
  const trainee = await CorporateTrainee.findById(req.body.corporateTraineeId);
  if (trainee) {
    return res.status(200).json(trainee);
  } else {
    res.status(400).json('Could not find no trainee with this id');
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
  updateCorporatePassword,
  getCorporateTraineeReportsIssued,
  requestAccessToCourse,
  markResourceAsSeen,
  getTrainee,
};
