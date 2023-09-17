const mongoose = require('mongoose');

// This refers to the WordBank Collection, which is a static collection of words provided in JSON by DS.
// Words can be categorized and assigned to a level and an exercise type. Related information needed for the exercises are also stored here (ex: images)

const wordBankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  exerciseType: {
    type: Number,
    enum: [1, 2],
    required: true,
  },
  wordLevel: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 1,
  },
  image: {
    type: String,
  },
});

wordBankSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('WordBank', wordBankSchema);
