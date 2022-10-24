//Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const adminRoutes = require('./Routes/AdminRoutes');
const courseRoutes = require('./Routes/CourseRoutes');

//Mongo URI
const mongoURI = process.env.MONGO_URI;

//port
const port = process.env.PORT || '8000';

//create express app
const app = express();

//JSON body parser middleware
app.use(express.json());

//Register API Routes , need to protect endpoints later
app.use('/course', courseRoutes);
app.use('/admin', adminRoutes);

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
