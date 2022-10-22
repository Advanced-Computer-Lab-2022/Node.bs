const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ExerciseSchema = new schema(
  {
    type: {
      type: String,
    },

    options: [
      {
        type: String, //must be of size 4
      },
    ],

    questions: {
      type: String,
    },
    answers: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model('Exercise', ExerciseSchema);
