const Course = require('./../Models/Course');

//optimized with extra projection parameter to reduce response size
const oSearchCourses = async (req, res) => {
  //req.body.query -> normal non referenced attributes -> {attr1 : val1 , attr2 : val2}
  //req.body.extQuery -> referenced attributes
  //req.body.extQuery.toBePopulated -> name of referenced attribute to be populated and then filtered by (i.e instructor) -> string
  //req.body.extQuery.query -> { attribute : value , att2 : val2, ....}
  //req.body.projection -> attributes to be sent back -> {attr1 : 1, attr2 : 1, ....}
  const result = await Course.find(req.body.query)
    .populate({
      path: req.body.extQuery.toBePopulated,
      match: req.body.extQuery.query,
    })
    .projection(req.body.projection);

  if (result) {
    return res.status(200).json(result);
  }
  res.status(404).json({ message: 'no results found' });
};

//optimized with extra projection parameter to reduce response size
const oFilterCourses = async (req, res) => {
  //req.body.query -> normal non referenced attributes -> {attr1 : val1 , attr2 : val2}
  //req.body.projection -> attributes to be sent back -> {attr1 : 1, attr2 : 1, ....}
  const result = await Course.find(req.body.query).projection(
    req.body.projection
  );

  if (result) {
    return res.status(200).json(result);
  }
  res.status(404).json({ message: 'no results found' });
};

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


module.exports = {
  oSearchCourses,
  oFilterCourses,
   createCourse, 
   searchCourses, 
   getAllCourses, 
   filterCourses
};
