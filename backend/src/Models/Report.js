const mongoose = require('mongoose');
const schema = mongoose.schema;
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
    type: { type: String },
    status: { type: String },
    seen: { type: Boolean },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Report', ReportSchema);
