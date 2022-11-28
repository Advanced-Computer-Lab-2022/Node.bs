const Course = require('./../Models/Course');
const Subtitle = require('./../Models/Subtitle');
const mongoose = require('mongoose');

// //optimized with extra projection parameter to reduce response size
// const oSearchCourses = async (req, res) => {
//   //req.body.query -> normal non referenced attributes -> {attr1 : val1 , attr2 : val2}
//   //req.body.extQuery -> referenced attributes
//   //req.body.extQuery.toBePopulated -> name of referenced attribute to be populated and then filtered by (i.e instructor) -> string
//   //req.body.extQuery.query -> { attribute : value , att2 : val2, ....}
//   //req.body.projection -> attributes to be sent back -> {attr1 : 1, attr2 : 1, ....}
//   const result = await Course.find(req.body.query)
//     .populate({
//       path: req.body.extQuery.toBePopulated,
//       match: req.body.extQuery.query,
//     })
//     .projection(req.body.projection);

//   if (result) {
//     return res.status(200).json(result);
//   }
//   res.status(404).json({ message: 'no results found' });
// };

// //optimized with extra projection parameter to reduce response size
// const oFilterCourses = async (req, res) => {
//   //req.body.query -> normal non referenced attributes -> {attr1 : val1 , attr2 : val2}
//   //req.body.projection -> attributes to be sent back -> {attr1 : 1, attr2 : 1, ....}
//   const result = await Course.find(req.body.query).projection(
//     req.body.projection
//   );

//   if (result) {
//     return res.status(200).json(result);
//   }
//   res.status(404).json({ message: 'no results found' });
// };

//get all Courses
const getAllCourses = async (req, res) => {
  const result = await Course.find()
    .populate('instructors')
    .populate('subtitles');

  if (result) {
    return res.status(200).json(result);
  }

  res.status(404).json({ message: 'no result found' });
};

//filter courses
const filterCourses = async (req, res) => {
  const instructorId = req.query.instructorId;
  const result = await Course.find({
    instructors: { $in: [mongoose.Types.ObjectId(instructorId)] },
  })
    .populate('instructors')
    .populate('subtitles');

  if (result) {
    return res.status(200).json(result);
  }

  res.status(404).json({ message: 'no result found' });
};

//seach courses
const searchCourses = async (req, res) => {
  console.log(req.body);
  const { title, subject } = req.body.query;
  const { firstName, lastName } = req.body.extQuery.query;
  let result1 = await Course.find({
    $or: [
      { title: { $regex: '(?i)' + title + '(?-i)' } },
      { subject: { $regex: '(?i)' + subject + '(?-i)' } },
    ],
  })
    .populate('instructors')
    .populate('subtitles');

  // console.log(result1);

  let result2 = await Course.find()
    .populate({
      path: 'instructors',
      match: {
        $or: [
          { firstName: { $regex: '(?i)' + firstName + '(?-i)' } },
          { lastName: { $regex: '(?i)' + lastName + '(?-i)' } },
        ],
      },
    })
    .populate('subtitles');
  // console.log(result2);

  const return2 = result2.filter((entry) => entry.instructors.length !== 0);

  const return1 = result1.filter(function (val) {
    result2.forEach((entry) => {
      if (entry._id.equals(val._id)) {
        console.log('found one duplicate');
        return false;
      }
    });
    return true;
  });
  // console.log(return1);
  // console.log('-----------------------------------');
  // console.log(return2);

  const result = return1.concat(return2);

  if (result) {
    return res.status(200).json(result);
  }

  res.status(404).json({ message: 'no result found' });
};

//create Course
const createCourse = async (req, res) => {
  try {
    let subtitleIDArray = [];
    let subtitleNameArray = req.body.subtitles;
    console.log(subtitleNameArray);
    for (let subtitle in subtitleNameArray) {
      let createdSubtitle = await Subtitle.create({
        name: subtitleNameArray[subtitle],
      });
      subtitleIDArray.push(createdSubtitle._id);
    }
    // req.body.subtitles = subtitleArray;
    const course = { ...req.body, subtitles: subtitleIDArray };
    console.log(course);
    // const result = await Course.create(course);
    res.status(203).json('result');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get course by ID

module.exports = {
  // oSearchCourses,
  // oFilterCourses,
  createCourse,
  searchCourses,
  getAllCourses,
  filterCourses,
};
