const Course = require('./../Models/Course');
const Subtitle = require('./../Models/Subtitle');
const Lesson = require('./../Models/Lesson');
const Test = require('./../Models/Test');
const IndividualTrainee = require('./../Models/IndividualTrainee');
const mongoose = require('mongoose');
const LearningResource = require('../Models/LearningResource');

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
    .populate({
      path: 'subtitles',
      populate: {
        path: 'lessons',
        populate: {
          path: 'test',
          populate: {
            path: 'exercises',
          },
        },
      },
    });

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
    .populate({
      path: 'subtitles',
      populate: {
        path: 'lessons',
        populate: {
          path: 'test',
          populate: {
            path: 'exercises',
          },
        },
      },
    });

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
    .populate({
      path: 'subtitles',
      populate: {
        path: 'lessons',
        populate: {
          path: 'test',
          populate: {
            path: 'exercises',
          },
        },
      },
    });

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
    .populate({
      path: 'subtitles',
      populate: {
        path: 'lessons',
        populate: {
          path: 'test',
          populate: {
            path: 'exercises',
          },
        },
      },
    });
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
    let subtitleIDArray = []; // references -> will be stored inside course
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
    // console.log(course);
    const result = await Course.create(course);
    res.status(203).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get course by ID
const getCourseById = async (req, res) => {
  try {
    const result = await Course.findById(req.query.id)
      .populate('instructors')
      .populate({
        path: 'subtitles',
        populate: {
          path: 'lessons',
          populate: {
            path: 'test',
            populate: {
              path: 'exercises',
            },
          },
        },
      });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json('not found');
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const updateCourse = async (req, res) => {
  try {
    const result = await Course.findOneAndUpdate(
      { _id: req.query.id },
      req.body
    );
    res.status(204).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateSubtitle = async (req, res) => {
  try {
    const result = await Subtitle.findOneAndUpdate(
      { _id: req.query.id },
      req.body
    );
    res.status(204).json(result);
  } catch (error) {
    res.status(500).json({ error });
  }
};
const createLesson = async (req, res) => {
  const subtitleId = req.body.subtitleId;
  const lesson = req.body.lesson;
  const createdLesson = await Lesson.create(lesson);
  const oldSubtitle = await Subtitle.findById(subtitleId);
  try {
    const subtitleUpdated = await Subtitle.findOneAndUpdate(
      { _id: subtitleId },
      { lessons: [...oldSubtitle.lessons, createdLesson._id] }
    );
    res.status(200).json(subtitleUpdated);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
const createResource = async (req, res) => {
  try {
    const lessonId = req.body.lessonId;
    const resource = req.body.resource;
    const createdResource = await LearningResource.create(resource);
    const lesson = await Lesson.findById(lessonId);
    console.log(lesson);
    let updatedResources = lesson.learningResources;
    updatedResources.push(createdResource._id);
    const response = await Lesson.findByIdAndUpdate(lessonId, {
      learningResources: updatedResources,
    });
    if (response) {
      res.status(200).json(response);
    } else [res.status(404).json({ message: 'no such lesson' })];
  } catch (error) {
    res.status(500).json({ message: 'unexpected error occured' });
    console.log(error);
  }
};

const getReviews = async (req, res) => {
  const courseId = req.body.courseId;
  console.log('-----------------------');
  console.log(req.body);
  console.log('req.body^^^^^^^^^^^^^^^^^^^^^^^^');
  console.log('course id: ' + courseId);
  const returnedQuery = await Course.findOne({
    _id: courseId,
  })
    .populate({ path: 'individualReviews.individualTrainee' })
    .populate({ path: 'corporateReviews.corporateTrainee' });

  console.log(returnedQuery);
  //   console.log(returnedQuery[0].individualReviews);
  //   console.log(returnedQuery[0].corporateReviews);

  individualReviews = returnedQuery.individualReviews;
  corporateReviews = returnedQuery.corporateReviews;
  const allReviews = individualReviews.concat(corporateReviews);

  if (returnedQuery) {
    return res.status(200).json(allReviews);
  }
  // res.status(404).json({ message: "Couldn't find any reviews" });
};

module.exports = {
  // oSearchCourses,
  // oFilterCourses,
  createCourse,
  searchCourses,
  getAllCourses,
  filterCourses,
  getCourseById,
  updateCourse,
  updateSubtitle,
  getReviews,
  createLesson,
  createResource,
};
