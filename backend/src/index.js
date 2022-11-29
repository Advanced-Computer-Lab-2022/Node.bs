//Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./Routes/AdminRoutes');
const courseRoutes = require('./Routes/CourseRoutes');
const instructorRoutes = require('./Routes/InstructorRoutes');
const cors = require('cors');

//Mongo URI
const mongoURI = process.env.MONGO_URI;

//port
const port = process.env.PORT || '8000';

//create express app
const app = express();
app.use(cors());
app.options('*', cors());
//cors error handler
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// });
//register deep populate plugin
// var deepPopulate = require('mongoose-deep-populate')(mongoose);
// PostSchema.plugin(deepPopulate, {} /* more on options below */);

//JSON body parser middleware
app.use(express.json());

//logger
app.use((req, res, next) => {
  console.log(req.method, req.path);
  console.log(req.body);
  next();
});
//Register API Routes , need to protect endpoints later
app.use('/course', courseRoutes);
app.use('/admin', adminRoutes);
app.use('/instructor', instructorRoutes);

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
