const Admin = require('../Models/Adminstrator');
const Instructor = require('../Models/Instructor');
const CorporateTrainee = require('../Models/CorporateTrainee');
const IndividualTrainee = require('../Models/IndividualTrainee');
const { sendEmail } = require('./../NodeMailer/main');
const bcrypt = require('bcrypt');
// Create an Admin

const createAdmin = async (req, res) => {
  try {
    const existingUser = await Admin.find({
      username: req.body.username,
    });
    if (existingUser.length == 0) {
      // const hashedPassword = bcrypt.hash(req.body.password,10);
      const admin = await Admin.create({
        ...req.body,
      });
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
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const instructor = await Instructor.create({
        ...req.body,
        password: hashedPassword,
      });
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
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const corporateTrainee = await CorporateTrainee.create({
        ...req.body,
        password: hashedPassword,
      });
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

module.exports = {
  createAdmin,
  createInstructor,
  createCorporateTrainee,
  resetPassword,
};
