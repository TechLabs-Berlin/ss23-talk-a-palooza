const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema(
  {
    name: String,
    binaryAudioData: {
      type: Buffer, // Store recording data as a Buffer
      required: true,
      subtype: 0x02, // Set the subtype to "audio"
    },
    intelligibilityScore: Number,
    is_recognized: Boolean,
    wordBankId: { type: mongoose.Schema.Types.ObjectId, ref: 'WordBank' },
    spokenWord: { type: mongoose.Schema.Types.ObjectId, ref: 'VocabLog' },
  },
  { timestamps: true }
);

recordingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

const Recording = mongoose.model('Recording', recordingSchema);

module.exports = Recording;
