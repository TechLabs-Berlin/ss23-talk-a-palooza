const mongoose = require('mongoose');

const opts = {
  timestamps: true,
  toJSON: {
    virtuals: true, // Enable virtuals in the JSON output
  },
};

const childSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    gender: {
      type: String,
      enum: ['M', 'F', 'rather not say'],
      required: true,
    },
    //[Data Science inputs needed for language level and initial assessment data]
    languageLevel: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    vocabLogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VocabLog',
      },
    ],
  },
  { timestamps: true },
  opts
);

childSchema.virtual('ageInMonths').get(function () {
  return Math.floor(
    //  we are returning the age in months
    (
      (Date.now() - this.birthDate.getTime()) /
      (1000 * 3600 * 24 * 30.44)
    ).toFixed(2)
  );
});

childSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
    returnedObject.ageInMonths = document.ageInMonths;
  },
});

const Child = mongoose.model('Child', childSchema);

module.exports = Child;
