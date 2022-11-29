const IndividualTrainee = require('./../Models/IndividualTrainee');
const mongoose = require('mongoose');

const reviewInstructor = async (req, res) => {
    const instructorId = req.body.instructorId;
    const review = req.bodu.fullReview; //contains rating and review together
    
}