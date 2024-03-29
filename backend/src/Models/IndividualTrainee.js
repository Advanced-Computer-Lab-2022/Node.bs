const mongoose = require('mongoose');
const schema = mongoose.Schema;

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
    gender: {
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
        seen: { type: Object, default: {} },
        paid: { type: Number },
      },
    ],
    wallet: {
      type: Number,
      default: 0,
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
    refundRequests: [
      {
        course: { type: schema.Types.ObjectId, ref: 'Course' },
        requestedAt: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('IndividualTrainee', IndividualTraineeSchema);
