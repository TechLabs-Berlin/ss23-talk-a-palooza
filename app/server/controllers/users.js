const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

// [To TEST]: Api endponts with REST. Also reduce to minimum needed API endpoints

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('children', {
    firstName: 1,
    birthDate: 1,
    gender: 1,
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

module.exports = usersRouter;
