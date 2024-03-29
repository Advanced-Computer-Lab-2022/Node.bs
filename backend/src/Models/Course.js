const mongoose = require('mongoose');
const schema = mongoose.Schema;

const CourseSchema = new schema(
  {
    title: {
      type: String,
    },
    rating: {
      type: Number,
    },
    totalHours: {
      type: Number,
    },
    subject: {
      type: String,
    },

    price: {
      type: Number,
    },
    instructors: [
      {
        type: schema.Types.ObjectId,
        ref: 'Instructor',
      },
    ],
    description: {
      type: String,
    },
    subtitles: [
      {
        type: schema.Types.ObjectId,
        ref: 'Subtitle',
      },
    ],
    currentDiscount: {
      expiryDate: { type: Date },
      percentage: { type: Number },
    },
    numberOfRegisteredTrainees: {
      type: Number,
      default: 0,
    },
    individualReviews: [
      {
        individualTrainee: {
          type: schema.Types.ObjectId,
          ref: 'IndividualTrainee',
        },
        review: { type: String },
        rating: { type: Number },
      },
    ],

    corporateReviews: [
      {
        corporateTrainee: {
          type: schema.Types.ObjectId,
          ref: 'CorporateTrainee',
        },
        review: { type: String },
        rating: { type: Number },
      },
    ],

    videoURL: {
      type: String,
    },
    numberOfLearningResources: {
      type: Number,
    },
    courseViews: {
      type: Number,
    },
    releaseDate: {
      type: Date,
    },
    reports: { type: schema.Types.ObjectId, ref: 'Report' },
    priceId: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', CourseSchema);
