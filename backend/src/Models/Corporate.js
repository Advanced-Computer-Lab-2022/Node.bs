const mongoose = require('mongoose');
const schema = mongoose.schema;
const CorporateSchema = new schema(
  {
    name: { type: String },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  },
  { timestamps: true }
);
module.exports = mongoose.model('Corporate', CorporateSchema);
