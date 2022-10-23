const mongoose = require('mongoose');
const schema = mongoose.Schema;

const LessonSchema = new schema(
  {
    learningResources: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'LearningResource' },
    ],
    test: { type: mongoose.Schema.Types.ObjectId, ref: 'Test' },
    name: { type: String },
    hours: { type: Number },
    description: { type: String },
    parentSubtitle: { type: mongoose.Schema.Types.ObjectId, ref: 'Subtitle' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', LessonSchema);
