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

module.exports = {
  oSearchCourses,
  oFilterCourses,
};
