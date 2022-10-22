const mongoose = require('mongoose');
const schema = mongoose.Schema;

const SubtitleSchema = new schema({
  name: { type: String },
  description: { type: String },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  hours: { type: Number },
  videoURL: { type: String },
});

module.exports = mongoose.model('Subtitle', SubtitleSchema);
