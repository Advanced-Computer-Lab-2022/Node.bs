const mongoose = require('mongoose');
const schema = mongoose.schema;
const TestSchema = new schema(
  {
    exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Test', TestSchema);
