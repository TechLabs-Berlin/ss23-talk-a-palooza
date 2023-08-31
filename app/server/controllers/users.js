const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

// [To TEST]: Api endponts with REST. Also reduce to minimum needed API endpoints

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('children', {
    firstname: 1,
    birthdate: 1,
    gender: 1,
    samples: 1,
  });
  res.json(users);
});

usersRouter.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

usersRouter.post('/', async (req, res) => {
  const { email, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    email,
    passwordHash,
  });

  const savedUser = await user.save();

  res.status(201).json(savedUser);
});

module.exports = usersRouter;
