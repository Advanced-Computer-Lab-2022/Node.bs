const mongoose = require('mongoose');
const schema = mongoose.Schema;

const LearningResourceSchema = new schema(
  {
    title: { type: String },
    type: { type: String },
    URL: { type: String },
    // extraResources: [{ resourceName: { type: String }, URL: { type: String } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('LearningResource', LearningResourceSchema);
