const addGoogleUser =
  (User) =>
  ({ googleId, email, firstName, displayName, lastName, profilePhoto }) => {
    console.log(
      googleId,
      email,
      displayName,
      firstName,
      lastName,
      profilePhoto
    );

    const user = new User({
      googleId,
      email,
      firstName,
      displayName,
      lastName,
      profilePhoto,
      source: 'google',
    });
    return user.save();
  };

const getUsers = (User) => () => {
  return User.find({});
};

const getUserByEmail =
  (User) =>
  async ({ email }) => {
    return await User.findOne({ email });
  };

module.exports = (User) => {
  return {
    addGoogleUser: addGoogleUser(User),
    getUsers: getUsers(User),
    getUserByEmail: getUserByEmail(User),
  };
};
