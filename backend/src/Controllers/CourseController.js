const Course = require('./../Models/Course');
const Subtitle = require('./../Models/Subtitle');
const Lesson = require('./../Models/Lesson');
const Test = require('./../Models/Test');
const IndividualTrainee = require('./../Models/IndividualTrainee');
const mongoose = require('mongoose');
const LearningResource = require('../Models/LearningResource');
const Report = require('../Models/Report');
const { findOne } = require('../Models/LearningResource');
const Instructor = require('../Models/Instructor');
const CorporateTrainee = require('../Models/CorporateTrainee');

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
const stripe = require('stripe')(process.env.STRIPE_SECRET);
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
    const product = await stripe.products.create({
      name: req.body.title,
    });
    const price = await stripe.prices.create({
      unit_amount: req.body.price * 100,
      currency: 'usd',
      product: product.id,
    });
    const course = {
      ...req.body,
      subtitles: subtitleIDArray,
      priceId: price.id,
    };

    const result = await Course.create(course);
    const instructor = await Instructor.findById(course.instructors[0]);
    let tmpCourses = instructor.courses;
    tmpCourses.push(result._id);
    await Instructor.findByIdAndUpdate(instructor._id, { courses: tmpCourses });
    // console.log(course);

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
    const courseId = req.body.courseId;
    const createdResource = await LearningResource.create(resource);
    const lesson = await Lesson.findById(lessonId);
    let updatedResources = lesson.learningResources;
    updatedResources.push(createdResource._id);
    const response = await Lesson.findByIdAndUpdate(lessonId, {
      learningResources: updatedResources,
    });
    if (response) {
      // //update individuals
      // const individuals = await IndividualTrainee.find({});

      // for (let individual in individuals) {
      //   // individuals.forEach((individual) => {

      //   individuals[individual].registeredCourses.map(
      //     async (registeredCourse, index) => {
      //       if (registeredCourse.course === courseId) {
      //         let tmpRegisteredCourses =
      //           individuals[individual].registeredCourses;
      //         tmpRegisteredCourses[index].seen[createdResource._id] = false;
      //         console.log(tmpRegisteredCourses[index]);
      //         await IndividualTrainee.findByIdAndUpdate(
      //           individuals[individual]._id,
      //           {
      //             registeredCourses: tmpRegisteredCourses,
      //           }
      //         );
      //       }
      //     }
      //   );
      // }
      // // });

      // //update corporates

      // const corporates = await CorporateTrainee.find({});

      // for (let individual in corporates) {
      //   corporates[individual].registeredCourses.map(
      //     async (registeredCourse, index) => {
      //       if (registeredCourse.course === courseId) {
      //         let tmpRegisteredCourses =
      //           corporates[individual].registeredCourses;
      //         tmpRegisteredCourses[index].seen[createdResource._id] = false;
      //         console.log(tmpRegisteredCourses[index]);
      //         await CorporateTrainee.findByIdAndUpdate(
      //           corporates[individual]._id,
      //           {
      //             registeredCourses: tmpRegisteredCourses,
      //           }
      //         );
      //       }
      //     }
      //   );
      // }

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

//////////////////////////////REPORTS///////////////////////////////////////
const addReport = async (req, res) => {
  const courseId = req.body.courseId;
  const traineeId = req.body.traineeId;
  const traineeType = req.body.traineeType;
  const reportType = req.body.reportType;
  const reportBody = req.body.reportBody;
  const instructorId = req.body.instructorId;
  console.log(req.body);
  console.log('instructorId: ' + instructorId);
  if (traineeType === '0') {
    const reportToBeAdded = {
      course: courseId,
      individualTrainee: traineeId,
      type: reportType,
      body: reportBody,
      status: 'unseen',
      seen: false,
      followups: [],
    };
    const newReport = await Report.create(reportToBeAdded);
    if (newReport) {
      return res.status(200).json(newReport);
    } else {
      return res.status(400).json('No report submitted');
    }
  } else if (traineeType === '1') {
    const reportToBeAdded = {
      course: courseId,
      corporateTrainee: traineeId,
      type: reportType,
      body: reportBody,
      status: 'unseen',
      seen: false,
      followups: [],
    };
    const newReport = await Report.create(reportToBeAdded);
    if (newReport) {
      return res.status(200).json(newReport);
    } else {
      return res.status(400).json('No report submitted');
    }
  } else if (instructorId) {
    console.log(courseId);
    const reportToBeAdded = {
      course: courseId,
      instructor: instructorId,
      type: reportType,
      body: reportBody,
      status: 'unseen',
      seen: false,
      followups: [],
    };
    const newReport = await Report.create(reportToBeAdded);
    if (newReport) {
      return res.status(200).json(newReport);
    } else {
      return res.status(400).json('No report submitted');
    }
  }
};

const addFollowupToReport = async (req, res) => {
  const reportId = req.body.reportId;
  const newFollowupBody = req.body.followupBody;

  console.log('bodyyy: ' + newFollowupBody);

  const newFollowupRecord = {
    followupBody: newFollowupBody,
    dateAdded: new Date(),
  };

  let query = await Report.findById(reportId);
  let oldFollowups = query.followups;
  console.log(oldFollowups);

  oldFollowups.push(newFollowupRecord);

  const updatedRecord = await Report.findByIdAndUpdate(reportId, {
    followups: oldFollowups,
  });

  if (updatedRecord) {
    return res.status(200).json(updatedRecord);
  } else {
    res.status(400).json('Something went wrong');
  }
};

const getAllReports = async (req, res) => {
  const returnedQuery = await Report.find()
    .populate('instructor')
    .populate('course')
    .populate('individualTrainee')
    .populate('corporateTrainee');

  console.log(returnedQuery);
  console.log('haga');
  if (returnedQuery) {
    return res.status(200).json(returnedQuery);
  } else {
    res.status(400).json('Something went wrong');
  }
};

const incrementViews = async (req, res) => {
  const courseId = req.body.courseId;
  const query = await Course.findOneAndUpdate(
    { _id: courseId },
    { $inc: { courseViews: 1 } }
  );

  if (query) {
    console.log('views: ' + query.courseViews);
    return res.status(200).json(query);
  } else {
    res.status(400).json('An error has occured');
  }
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
  addReport,
  addFollowupToReport,
  getAllReports,
  incrementViews,
};
