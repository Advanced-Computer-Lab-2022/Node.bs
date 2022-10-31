const Admin = require('../Models/Adminstrator');
const Instructor = require('../Models/Instructor');
const CorporateTrainee = require('../Models/CorporateTrainee');

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

module.exports = {
  createAdmin,
  createInstructor,
  createCorporateTrainee,
};
