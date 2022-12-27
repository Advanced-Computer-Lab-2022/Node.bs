const mongoose = require('mongoose');
const schema = mongoose.Schema;
const ReportSchema = new schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    individualTrainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'IndividualTrainee',
    },
    corporateTrainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CorporateTrainee',
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Instructor',
    },
    type: { type: String },
    body: { type: String },
    status: { type: String },
    seen: { type: Boolean },
    followups: [{ followupBody: { type: String }, dateAdded: {type: Date } }],
  },
  { timestamps: true }
);
module.exports = mongoose.model('Report', ReportSchema);
