const mongoose = require('mongoose');

const vocabLogSchema = new mongoose.Schema(
  {
    spokenWords: [
      {
        word: String,
        recordings: [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Recording',
          },
        ],
        peerComparisonScore: {
          type: Number,
          enum: [1, 2, 3, 4, 5],
        }, // 1: “don’t know”, 2: “much lower”, 3: “lower”, 4: “normal”, 5: “higher”, 6: “much higher”
        wordBank: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'WordBank',
        },
      },
    ],
    // populate later with firstname, ageInMonths, gender
    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Child',
    },
  },
  { timestamps: true }
);

vocabLogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

const VocabLog = mongoose.model('VocabLog', vocabLogSchema);

module.exports = VocabLog;
