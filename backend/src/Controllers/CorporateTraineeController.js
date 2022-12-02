const CorporateTrainee = require('./../Models/CorporateTrainee');
const mongoose = require('mongoose');
const Submission = require('./../Models/Submission');
const LearningResource = require('./../Models/LearningResource');

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
};
