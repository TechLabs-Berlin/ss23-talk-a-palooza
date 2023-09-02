const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  important: Boolean,
  child: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Child',
  },
});

sampleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Sample', sampleSchema);
