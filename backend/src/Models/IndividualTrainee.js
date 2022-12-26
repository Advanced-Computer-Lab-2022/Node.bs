const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Course = require('./Course');

const IndividualTraineeSchema = new schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    username: {
      type: String,
    },

    password: {
      type: String,
    },
    registeredCourses: [
      {
        course: { type: schema.Types.ObjectId, ref: 'Course' },
        submissions: [{ type: schema.Types.ObjectId, ref: 'Submission' }],
        progress: { type: Number },
        seen: { type: Object },
        paid: {type: Number}
      },
    ],

    refundRequests: [
      {
        course: { type: schema.Types.ObjectId, ref: 'Course' },
        requestedAt: { type: Date },
      },
    ],

    wallet: {
      type: Number,
    },
    verified: {
      type: Boolean,
    },

    creditCard: {
      cardNumber: { type: String },
      expiryDate: { type: Date },
    },
    pathToCertificate: {
      type: String,
    },
    notebook: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('IndividualTrainee', IndividualTraineeSchema);

//BIGGIE ID
// 63a2eb4d7dcc2cec5b085060
