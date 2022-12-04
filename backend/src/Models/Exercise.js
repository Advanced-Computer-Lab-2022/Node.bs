const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ExerciseSchema = new schema(
  {
    type: {
      type: String,
    },

    options: {
      type: Object, //must be of size 4
    },

    question: {
      type: String,
    },
    answer: {
      type: String,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model('Exercise', ExerciseSchema);
