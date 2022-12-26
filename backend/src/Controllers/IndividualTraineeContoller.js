const IndividualTrainee = require('./../Models/IndividualTrainee');
const Submission = require('./../Models/Submission');
const mongoose = require('mongoose');
const Course = require('./../Models/Course');
const Instructor = require('./../Models/Instructor');

const reviewInstructorIndividual = async (req, res) => {
  const instructorId = req.body.instructorId;

  const individualTraineeId = req.body.user;
  const newReview = req.body.review;

  const newReviewFinalForm = {
    user: individualTraineeId,
    rating: newReview.rating,
    review: newReview.review,
  };

  const instructorReturned = await Instructor.findOne({ _id: instructorId });
  const instructorOldReviews = await instructorReturned.individualReviews;

  instructorOldReviews.push(newReviewFinalForm);

  const updatedInstrcutor = await Instructor.findByIdAndUpdate(
    { _id: instructorId },
    { individualReviews: instructorOldReviews }
  );

  res.status(200).json(updatedInstrcutor);
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

  // const indivReturned = await IndividualTrainee.findById(individualTraineeId)
  const courseReturned = await Course.findById(courseId);
  // const courseReturned = await Course.findOne({_id: "638513ddc4c0ad7f28e02965"});
  let courseOldReviews = courseReturned.individualReviews;

  courseOldReviews.push(newReviewFinalForm);

  const updatedCourse = await Course.findByIdAndUpdate(
    { _id: courseId },
    { individualReviews: courseOldReviews }
  );

  res.status(200).json(updatedCourse);
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

//eminem userId ...
// 638796ae23b3b73229cb811b

//theory of computation Course
//6383839a91e12ea9533bcc71

//accounting course
//635f37d1de75e20effb14fc5

//Dr. Haythem Ismail
//635f37bcde75e20effb14fc3

const getMyCourses = async (req, res) => {
  const myId = req.query.id;
  try {
    const user = await IndividualTrainee.findById(myId)
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
      res.status(200).json(user.registeredCourses);
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
const submitTest = async (req, res) => {
  try {
    const submission = await Submission.create(req.body.submission);
    let trainee = await IndividualTrainee.findById(req.body.traineeId);
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
const updateIndividualPassword = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'This ID is false' });
  }

  const individualTrainee = await IndividualTrainee.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!individualTrainee) {
    return res.status(400).json({ error: 'individual trainee not found' });
  }
  res.status(200).json(individualTrainee);
};

module.exports = {
  getMyCourses,
  submitTest,
  viewRegisteredCourse,
  createNewIndividualTrainee,
  registerToCourse,
  reviewCourseIndividual,
  reviewInstructorIndividual,
  updateIndividualPassword,
};
