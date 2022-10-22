const mongoose = require('mongoose');
const schema = mongoose.Schema;

const IndividualTraineeSchema = new schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: Number,
  },
  email: {
    type: Number,
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
  Notebook: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model('IndividualTrainee', IndividualTraineeSchema);
