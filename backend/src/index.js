//Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//Mongo URI
const mongoURI = process.env.MONGO_URI;

//port
const port = process.env.PORT || '8000';

//create express app
const app = express();

//JSON body parser middleware
app.use(express.json());

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
