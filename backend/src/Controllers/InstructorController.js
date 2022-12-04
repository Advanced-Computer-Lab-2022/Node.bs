const Instructor = require('../Models/Instructor');
const Lesson = require('../Models/Lesson');
const Subtitle = require('../Models/Subtitle');
const Exercise = require('../Models/Exercise');
const mongoose = require('mongoose');
const Test = require('../Models/Test');

const createTest = async (req, res) => {
  // const instructorId = req.body.instructorId;
  const lessonId = req.body.lessonId;
  let test = req.body.test;
  //   Instructor.updateOne({ _id: instructorId }, { $ });
  let exercisesId = [];
  ////////////////CREATE EXERCISE//////////////////////////
  ////////de-chain test object/////////////////
  // test.forEach(async (exercise) => {
  //   const exerciseInstance = await Exercise.create({
  //     type: 'MCQ',
  //     question: exercise.question,
  //     options: exercise.choices,
  //     answer: exercise.answer,
  //   });
  //   exercisesId.push(exerciseInstance._id);
  //   console.log(exerciseInstance);
  // });
  for (let TestIndex in test) {
    const exerciseInstance = await Exercise.create({
      type: 'MCQ',
      question: test[TestIndex].question,
      options: test[TestIndex].choices,
      answer: test[TestIndex].answer,
    });
    exercisesId.push(exerciseInstance._id);
    console.log(exerciseInstance);
  }

  console.log('new exer id!!!! =>>>>', exercisesId);

  const testInstance = await Test.create({ exercises: exercisesId });
  // console.log(testInstance);

  const lessonUpdate = await Lesson.findOneAndUpdate(
    { _id: lessonId },
    { test: testInstance._id }
  );

  // console.log(lessonUpdate);
  //   console.log(questions);

  //   const returned = await Subtitle.updateOne({
  //     _id: mongoose.Types.ObjectId(lessonId),
  //   }, $set: {
  //     test:
  //   });

  //   ({
  //     parentSubtitle: mongoose.Types.ObjectId('635f5a2f0e456e7d8fcf6bd5'),
  //   });

  res.status(200).json(lessonUpdate);
};

const getReviews = async (req, res) => {
  const instructorId = req.body.instructorId;
  const returnedQuery = await Instructor.findOne({
    _id: mongoose.Types.ObjectId(instructorId),
  });
  //   console.log(returnedQuery[0].individualReviews);
  //   console.log(returnedQuery[0].corporateReviews);
  individualReviews = returnedQuery.individualReviews;
  corporateReviews = returnedQuery.corporateReviews;
  const allReviews = individualReviews.concat(corporateReviews);

  if (returnedQuery) {
    return res.status(200).json(allReviews);
  }
  res.status(404).json({ message: "Couldn't find any reviews" });
};

module.exports = {
  getReviews,
  createTest,
};

// Rami Younes ID
// "instructorId": "635f37bcde75e20effb14fc3"

//subtitle ID
// 635f5a2f0e456e7d8fcf6bd5
