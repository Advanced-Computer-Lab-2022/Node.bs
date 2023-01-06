const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const IndividualTrainee = require('./../Models/IndividualTrainee');
const Instructor = require('./../Models/Instructor');
const CorporateTrainee = require('./../Models/CorporateTrainee');
const Adminstrator = require('./../Models/Adminstrator');

const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
  return jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: '50m',
  });
};

const signup = async (req, res) => {
  try {
    // Extract the email and password from the request body
    const { email, password, username, firstName, lastName, gender } = req.body;

    // Check if the email already exists in the database
    const emailSuspect = await IndividualTrainee.findOne({ email });
    const InstructorSuspect = await Instructor.findOne({ email });
    const CorporateTraineeSuspect = await CorporateTrainee.findOne({ email });

    if (emailSuspect || InstructorSuspect || CorporateTraineeSuspect) {
      // If the email already exists, return an error
      return res.status(400).json({ error: 'Email already in use' });
    }

    const usernameSuspect = await IndividualTrainee.findOne({ username });
    const InstructorUsernameSuspect = await Instructor.findOne({ username });
    const CorporateUsernameSuspect = await CorporateTrainee.findOne({
      username,
    });
    const adminSuspect = await Adminstrator.findOne({ username });
    if (
      usernameSuspect ||
      InstructorUsernameSuspect ||
      CorporateUsernameSuspect ||
      adminSuspect
    ) {
      // If the email already exists, return an error
      return res.status(400).json({ error: 'Username already in use' });
    }

    // If the email and username do not exist, hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user object with the email and hashed password
    const newUser = new IndividualTrainee({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      gender,
    });

    // Save the new user to the database
    await newUser.save();

    const token = createToken(username);

    // If the user was successfully saved, send a response
    // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ _id: newUser._id, token });
  } catch (error) {
    // If there was an error, return an error
    res.status(500).json({ error });
  }
};

const signIn = async (req, res) => {
  const { username, password } = req.body;

  let user = await IndividualTrainee.findOne({ username });
  let type = 'individual';

  if (!user) {
    user = await Instructor.findOne({ username });
    type = 'instructor';
  }
  if (!user) {
    user = await CorporateTrainee.findOne({ username });
    type = 'corporate';
  }
  if (!user) {
    user = await Adminstrator.findOne({ username });
    type = 'admin';
  }

  if (user && type !== 'admin') {
    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        const refreshToken = jwt.sign(
          {
            name: user.username,
          },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
        );

        const token = createToken(user.username);

        res.cookie('jwt', token, {
          httpOnly: false,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.cookie('refresh', refreshToken, {
          httpOnly: false,
          maxAge: maxAge * 2000,
        });
        res.status(200).json({ _id: user._id, type, token });
      } else {
        res.status(400).json({ message: 'Incorrect password' });
      }
    });
    // if (correctPwd) {
    //   const token = createToken(user.username);
    //   res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    //   res.status(200).json({ _id: user._id, type, token });
    // } else {
    //   res.status(400).json({ message: 'Incorrect username or password' });
    // }
  } else if (user) {
    if (user.password === password) {
      const refreshToken = jwt.sign(
        {
          username: user.username,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      const token = createToken(user.username);

      res.cookie('jwt', token, {
        httpOnly: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie('refresh', refreshToken, {
        httpOnly: false,
        maxAge: maxAge * 2000,
      });
      res.status(200).json({ _id: user._id, type, token });
    } else {
      res.status(400).json({ message: 'Incorrect password' });
    }
  } else {
    res.status(400).json({ message: 'Incorrect username or password' });
  }
};

const logOut = async (req, res) => {
  res.cookie('jwt', '');
  res.cookie('refresh', '');
  res.status(200).json({ message: 'logged out succesfully' });
};

module.exports = {
  signup,
  signIn,
  logOut,
};
