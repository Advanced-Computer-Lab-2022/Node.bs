const mongoose = require('mongoose');
const schema = mongoose.Schema;

const InstructorSchema = new schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    fieldOfExpertise: { type: String },
    overview: { type: String },
    rating: { type: Number },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    individualReviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'IndividualTrainee',
        },
        review: {
          type: String,
        },
        rating: {
          type: Number,
        },
      },
    ],
    corporateReviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'CorporateTrainee',
        },
        review: {
          type: String,
        },
        rating: {
          type: Number,
        },
      },
    ],
    moneyOwedPerMonth: { type: Number },
  },
  { timestamps: true }
);
console.log('test');
module.exports = mongoose.model('Instructor', InstructorSchema);
