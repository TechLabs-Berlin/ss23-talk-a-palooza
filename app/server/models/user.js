const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Child',
    },
  ],
  samples: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sample',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
