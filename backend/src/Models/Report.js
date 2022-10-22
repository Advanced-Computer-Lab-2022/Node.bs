const mongoose = require('mongoose');
const schema = mongoose.schema;
const ReportSchema = new schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    trainee: { type: mongoose.Schema.Types.ObjectId, ref: 'Trainee' },
    type: { type: String },
    Status: { type: String },
    Seen: { type: Boolean },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Report', ReportSchema);
