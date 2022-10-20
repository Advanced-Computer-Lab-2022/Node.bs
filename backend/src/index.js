require('dotenv').config();
console.log(process.env.PORT);
const express = require('express');

//create express app
const app = express();
//port
const port = process.env.PORT || '8000';
//listen for requests
app.listen(port, () => {
  console.log('listening on port 4000');
});
let omar = 'omar';
