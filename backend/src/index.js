//Imports
require('dotenv').config();
const express = require('express');

//create express app
const app = express();

//JSON body parser middleware
app.use(express.json());

//port
const port = process.env.PORT || '8000';

//listen for requests
app.listen(port, () => {
  console.log('listening on port 4000');
});

//Mongo URI
const MongoURI = process.env.MONGO_URI;
