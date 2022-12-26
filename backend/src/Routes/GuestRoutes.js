const express = require('express');
const Router = express.Router();
const guestController = require('../Controllers/GuestController');

Router.post('/signup', guestController.signup);
Router.post('/signin', guestController.signIn);

module.exports = Router;
