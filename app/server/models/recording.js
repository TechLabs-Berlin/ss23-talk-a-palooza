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
    wordBankId: { type: mongoose.Schema.Types.ObjectId, ref: 'WordBank' },
    spokenWord: { type: mongoose.Schema.Types.ObjectId, ref: 'VocabLog' },
  },
  { timestamps: true }
);

recordingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    // delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Recording = mongoose.model('Recording', recordingSchema);

module.exports = Recording;
