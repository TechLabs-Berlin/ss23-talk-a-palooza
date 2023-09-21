const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema(
  {
    binaryAudioData: {
      type: Buffer, // Store recording data as a Buffer
      required: true,
      subtype: 0x02, // Set the subtype to "audio"
    },
    intelligibilityScore: Boolean,
    is_recognized: Number, // TODO: download mongoose-float npm package to use Float type
    wordBank: { type: mongoose.Schema.Types.ObjectId, ref: 'WordBank' },
    vocabLog: { type: mongoose.Schema.Types.ObjectId, ref: 'Vocablog' },
  },
  { timestamps: true }
);

recordingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Recording = mongoose.model('Recording', recordingSchema);

module.exports = Recording;
