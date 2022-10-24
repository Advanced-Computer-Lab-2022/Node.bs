const Course = require('../Models/Course');

//get all Courses
const getAllCourses = async (req, res) => {
  const result = await Course.find();

  if (result) {
    return res.status(200).json(result);
  }

  res.status(404).json({ message: 'no result found' });
};

//filter courses
const filterCourses = async (req, res) => {
  const result = await Course.find(req.body.query);

  if (result) {
    return res.status(200).json(result);
  }

  res.status(404).json({ message: 'no result found' });
};

//seach courses
const searchCourses = async (req, res) => {
  const result = await Course.find(req.body.query).populate({
    path: req.body.extQuery.toBePopulated,
    match: req.body.extQuery.query,
  });

  if (result) {
    return res.status(200).json(result);
  }

  res.status(404).json({ message: 'no result found' });
};

//create Course
const createCourse = async (req, res) => {
  try {
    const result = await Course.create(req.body.course);
    res.status(203).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createCourse, searchCourses, getAllCourses, filterCourses };
