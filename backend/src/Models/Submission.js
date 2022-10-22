const mongoose = require('mongoose');
const schema = mongoose.schema;
const SubmissionSchema = new schema(
  {
    answers: [{ type: String }],
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    grade: { type: Number },
    date: { type: Date },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Submission', SubmissionSchema);
