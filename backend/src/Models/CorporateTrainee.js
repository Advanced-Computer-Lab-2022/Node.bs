const mongoose = require('mongoose');
const schema = mongoose.Schema;
const CorporateTraineeSchema = new schema({
  corporateCompany: {
    type: schema.Types.ObjectId,
    ref: 'Corporate',
  },
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
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
    },
  ],
  pathToCertificate: {
    type: String,
  },
  notebook: [
    {
      type: String,
    },
  ],
  requestedCourses: {
    type: schema.Types.ObjectId,
    ref: 'Course',
  },
});
module.exports = mongoose.model('CorporateTrainee', CorporateTraineeSchema);
