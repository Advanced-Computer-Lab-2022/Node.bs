const Admin = require('../Models/Adminstrator');
const Instructor = require('../Models/Instructor');
const CorporateTrainee = require('../Models/CorporateTrainee');
const IndividualTrainee = require('../Models/IndividualTrainee');
const { sendEmail } = require('./../NodeMailer/main');
const Report = require('../Models/Report');
const Course = require('../Models/Course');
// Create an Admin

const createAdmin = async (req, res) => {
  try {
    const existingUser = await Admin.find({
      username: req.body.username,
    });
    if (existingUser.length == 0) {
      const admin = await Admin.create(req.body);
      res.status(203).json(admin);
    } else {
      res.status(400).json({ message: 'user already in use' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create Instructor

const createInstructor = async (req, res) => {
  try {
    const existingUser = await Instructor.find({
      $or: [{ username: req.body.username }],
    });
    if (existingUser.length == 0) {
      const instructor = await Instructor.create(req.body);
      res.status(203).json(instructor);
    } else {
      res.status(400).json({ message: 'user already in use' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Create Corporate Trainee

const createCorporateTrainee = async (req, res) => {
  try {
    const existingUser = await CorporateTrainee.find({
      username: req.body.username,
    });
    if (existingUser.length == 0) {
      const corporateTrainee = await CorporateTrainee.create(req.body);
      res.status(203).json(corporateTrainee);
    } else {
      res.status(400).json({ message: 'user already in use' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { id } = req.body;
  let type = 0;
  console.log('id->>>>', id);
  let found = await Instructor.findById(id);
  if (!found) {
    found = await IndividualTrainee.findById(id);
    type = 1;
    if (!found) {
      found = await CorporateTrainee.findById(id);
      type = 2;
    }
  }

  console.log(found);
  sendEmail(found.email, `http://localhost:3000/change-password/${id}/${type}`);
};
const markReportsAsResolved = async (req, res) => {
  const reportId = req.body.reportId;

  const reportToBeResolved = await Report.findOneAndUpdate(
    { _id: reportId },
    {
      status: 'Resolved',
    }
  );

  console.log(reportToBeResolved);
  if (reportToBeResolved) {
    return res.status(200).json(reportToBeResolved);
  } else {
    res.status(400).json('An error has occurred');
  }
};

const markReportsAsPending = async (req, res) => {
  const reportId = req.body.reportId;

  const reportToBePending = await Report.findOneAndUpdate(
    { _id: reportId },
    {
      status: 'Pending',
    }
  );

  if (reportToBePending) {
    return res.status(200).json(reportToBePending);
  } else {
    res.status(400).json('An error has occurred');
  }
};

const getCorporateTrainees = async (req, res) => {
  const requests = await CorporateTrainee.find().populate({
    path: 'requestedCourses',
  });
  if (requests) {
    return res.status(200).json(requests);
  } else {
    res.status(400).json('An error has occurred');
  }
};

const grantAccessToCourse = async (req, res) => {
  const corporateTraineeId = req.body.corporateTraineeId;
  const courseId = req.body.courseId;

  //remove from requests
  const corporateTrainee = await CorporateTrainee.findOne({
    _id: corporateTraineeId,
  });
  //requested courses from document
  let requests = corporateTrainee.requestedCourses;
  //get index
  const indexOfCourse = requests.indexOf(courseId);
  //remove item from requests
  requests.splice(indexOfCourse, 1);
  //update to remove from document
  const removeRequest = await CorporateTrainee.findOneAndUpdate(
    {
      _id: corporateTraineeId,
    },
    { requestedCourses: requests }
  );

  //get to registeredCourses
  let registeredCoursesTemp = corporateTrainee.registeredCourses;

  if (!registeredCoursesTemp.includes(courseId)) {
    const course = await Course.findById(courseId).populate({
      path: 'subtitles',
      populate: {
        path: 'lessons',
      },
    });
    let seen = {};
    course.subtitles.forEach((subtitle) => {
      subtitle.lessons.forEach((lesson) => {
        lesson.learningResources.forEach((resource) => {
          seen[resource] = false;
        });
      });
    });
    //add to registered courses
    registeredCoursesTemp.push({
      course: courseId,
      submissions: [],
      progress: 0,
      seen,
    });

    //update Trainee (requested -> registered)
    const updateTrainee = await CorporateTrainee.findOneAndUpdate(
      { _id: corporateTraineeId },
      { registeredCourses: registeredCoursesTemp }
    );
    if (updateTrainee) {
      return res.status(200).json(updateTrainee);
    } else {
      res.status(400).json('an error occurred');
    }
  }
};

const returnCoursesFromSearch = async (req, res) => {
  const query = req.body.query;
  const result = await Course.find({ title: { $regex: query, $options: 'i' } });
  console.log(result);
  if (result) {
    return res.status(200).json(result);
  } else {
    res.status(400).json('an erorr occurred');
  }
};

const applyPromotionOnCourses = async (req, res) => {
  const courses = req.body.courses;
  const promotion = req.body.promotion;
  const promotionEndDate = req.body.promotionEndDate;

  const discount = { expiryDate: promotionEndDate, percentage: promotion };

  const query = await Course.updateMany(
    { _id: { $in: courses } },
    { $set: { currentDiscount: discount } }
  );

  if (query) {
    return res.status(200).json(query);
  } else {
    res.status(400).json('An error has occurred');
  }
};

const getRefundRequests = async (req, res) => {
  try {
    const trainees = await IndividualTrainee.find().populate("refundRequests.course");
    let traineesRequestingRefund = [];

    trainees.map((trainee) => {
      if (trainee.refundRequests.length > 0) {
        // trainee.refundRequests.map( async (request, index)=>{
        //   const populatedCourse = await Course.findOne({_id: (request.course)});
        //   console.log(request.course)
        //   console.log("CourseId: ->>>>" + populatedCourse)
        //   trainee.refundRequests[index] = populatedCourse;
        // })
       
        traineesRequestingRefund.push(trainee);
      }
    });

    // console.log(traineesRequestingRefund[1].refundRequests);

    return res.status(200).json(traineesRequestingRefund);
  } catch (e) {
    console.log(e);
  }

  // console.log(trainees);
};
module.exports = {
  createAdmin,
  createInstructor,
  createCorporateTrainee,
  resetPassword,
  markReportsAsPending,
  markReportsAsResolved,
  getCorporateTrainees,
  grantAccessToCourse,
  returnCoursesFromSearch,
  applyPromotionOnCourses,
  getRefundRequests,
};


//HOWA DA

//taken from individual
//63a63d3b88badb91e2cc19b7

//actual id
//63a60dd0adbc47b995d31829