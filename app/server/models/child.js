const mongoose = require('mongoose');

const childSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    birthdate: { type: Date, required: true },
    gender: {
      type: String,
      enum: ['boy', 'girl', 'rather not say'],
      required: true,
    },
    //[Data Science inputs needed for language level and initial assessment data]
    languageLevel: {
      type: Number,
    },
    initialAssessment: {},
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    samples: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sample',
      },
    ],
  },
  { timestamps: true }
  // {
  //   virtuals: {
  //     age: {
  //       get() {
  //         return Math.floor(
  //           (Date.now() - this.birthdate.getTime()) / (1000 * 3600 * 24 * 365)
  //         );
  //       },
  //     },
  //   },
  // }
);

childSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

const Child = mongoose.model('Child', childSchema);

module.exports = Child;
