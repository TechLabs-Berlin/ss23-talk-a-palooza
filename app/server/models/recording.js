const mongoose = require('mongoose');

const recordingSchema = new mongoose.Schema(
  {
    binaryAudioData: {
      type: Buffer, // Store recording data as a Buffer
      required: true,
      subtype: 0x02, // Set the subtype to "audio"
    },
    intelligibilityScore: Boolean,
    // TODO: download mongoose-float npm package to use Float type
    is_recognized: Number,
    spokenWords: { type: mongoose.Schema.Types.ObjectId, ref: 'SpokenWords' },
  },
  { timestamps: true }
);

const Recording = mongoose.model('Recording', recordingSchema);

module.exports = Recording;
