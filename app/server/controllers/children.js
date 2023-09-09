const childrenRouter = require('express').Router();
const { validationResult } = require('express-validator');
const Child = require('../models/child');
const User = require('../models/user');

// [To TEST]: Api endponts with REST. Also reduce to minimum needed API endpoints

childrenRouter.get('/', async (req, res) => {
  const children = await Child.find({}).populate('samples', {
    content: 1,
    important: 1,
  });
  res.json(children);
});

childrenRouter.get('/:id', async (req, res) => {
  const child = await Child.findById(req.params.id);
  if (child) {
    res.json(child);
  } else {
    res.status(404).end();
  }
});

childrenRouter.post('/', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, birthdate, gender, user } = req.body;

    const child = new Child({
      firstname,
      birthdate,
      gender,
    });

    const updatedUser = await User.findOneAndUpdate(
      { _id: user },
      { $push: { children: child } },
      { new: true }
    );

    await child.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

childrenRouter.delete('/:id', async (req, res) => {
  await child.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

childrenRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const child = {
    content: body.content,
    important: body.important,
  };

  Child.findByIdAndUpdate(req.params.id, child, { new: true })
    .then((updatedChild) => {
      res.json(updatedChild);
    })
    .catch((error) => next(error));
});

module.exports = childrenRouter;
