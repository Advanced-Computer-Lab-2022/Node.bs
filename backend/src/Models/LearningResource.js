const mongoose = require('mongoose');
const schema = mongoose.Schema;

const LearningResourceSchema = new schema({
  type: { type: String },
  URL: { type: String },
  extraResources: [{ resourceName: { type: String }, URL: { type: String } }],
});

module.exports = mongoose.model('LearningResource', LearningResourceSchema);
