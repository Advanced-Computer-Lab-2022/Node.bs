const IndividualTrainee = require('./../Models/IndividualTrainee');
const Submission = require('./../Models/Submission');
const mongoose = require('mongoose');

const reviewInstructor = async (req, res) => {
  const instructorId = req.body.instructorId;
  const review = req.bodu.fullReview; //contains rating and review together
};

const getMyCourses = async (req, res) => {
  const myId = req.query.id;
  try {
    const user = await IndividualTrainee.findById(myId)
      .populate('registeredCourses.course')
      .populate('registeredCourses.submissions');

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

module.exports = {
  reviewInstructor,
  getMyCourses,
  submitTest,
};
