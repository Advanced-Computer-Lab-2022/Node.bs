const mongoose = require('mongoose');
const schema = mongoose.schema;
const AdminSchema = new schema(
  {
    username: { type: String },
    password: { type: String },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Adminstrator', AdminSchema);
