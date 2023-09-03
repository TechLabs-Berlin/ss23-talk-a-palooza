const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: [true, 'email required'],
      unique: [true, 'email already registered'],
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    firstName: String,
    displayName: String,
    lastName: String,
    profilePhoto: String,
    password: String,
    source: { type: String, required: [true, 'source not specified'] },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child',
      },
    ],
  },
  { timestamps: true }
);

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    // returnedObject.email = returnedObject.email.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
