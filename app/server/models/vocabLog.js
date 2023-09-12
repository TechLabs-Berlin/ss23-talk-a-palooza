const mongoose = require('mongoose');

const vocabLogSchema = new mongoose.Schema(
  {
    spokenWords: [String],
    // required?: true, [TO BE DISCUSSED WITH DS]: Case where the child is totally non-verbal?
    intelligibilityScore: {
      type: Boolean,
    },
    // 1: “don’t know”, 2: “much lower”, 3: “lower”, 4: “normal”, 5: “higher”, 6: “much higher”
    peerComparisonScore: {
      type: Number,
      enum: ['1', '2', '3', '4', '5'],
    },
    // populate later with firstname, ageInMonths, gender
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Child',
      required: true,
    },
    words: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WordBank',
      },
    ],
  },
  { timestamps: true }
);

vocabLogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

const VocabLogs = mongoose.model('VocabLog', vocabLogSchema);

module.exports = VocabLogs;
