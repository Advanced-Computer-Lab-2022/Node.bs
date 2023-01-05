//Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./Routes/AdminRoutes');
const courseRoutes = require('./Routes/CourseRoutes');
const instructorRoutes = require('./Routes/InstructorRoutes');
const individualTraineeRoutes = require('./Routes/IndividualTraineeRoutes');
const corporateTraineeRoutes = require('./Routes/CorporateTraineeRoutes');
const guestRoutes = require('./Routes/GuestRoutes');
const cors = require('cors');
const cookieparser = require('cookie-parser');
const { authMiddleware } = require('./Middleware/authMiddleware');

//Mongo URI
const mongoURI = process.env.MONGO_URI;

//port
const port = process.env.PORT || '8000';

//create express app
const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',

    credentials: true,
  })
);
// app.options(
//   '*',

// );
//cors error handler
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Headers', '*');
//   res.header(`Access-Control-Allow-Credentials`, 'true');
//   next();
// });
//register deep populate plugin
// var deepPopulate = require('mongoose-deep-populate')(mongoose);
// PostSchema.plugin(deepPopulate, {} /* more on options below */);

//JSON body parser middleware
app.use(express.json());
app.use(cookieparser());

//logger
app.use((req, res, next) => {
  console.log(req.method, req.path);
  console.log(req.body);
  next();
});
//Register API Routes , need to protect endpoints later
app.use('/guest', guestRoutes);
app.use('/course', courseRoutes);
app.use('/admin', adminRoutes);
app.use('/instructor', authMiddleware('instructor'), instructorRoutes);
app.use('/individual', authMiddleware('individual'), individualTraineeRoutes);
app.use('/corporate', authMiddleware('corporate'), corporateTraineeRoutes);

//connect to db (promise <=> resolve=>then , reject=>catch)
mongoose
  .connect(mongoURI)
  .then(() => {
    //listen for requests
    app.listen(port, () => {
      console.log('db connection established!');
      console.log('listening on port', port);
    });
  })
  .catch((error) => console.log(error));
