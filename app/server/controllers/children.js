const childrenRouter = require('express').Router();
const { validationResult } = require('express-validator');
const Child = require('../models/child');
const User = require('../models/user');

// Get all children
childrenRouter.get('/', async (req, res) => {
  const children = await Child.find({});
  res.json(children);
});

// Get a child by id and populate spokenWords
childrenRouter.get('/:id', async (req, res) => {
  const child = await Child.findById(req.params.id).populate('vocabLogs', {
    spokenWords: 1,
  });
  if (child) {
    res.json(child);
  } else {
    res.status(404).end();
  }
});

// Create a new child, add initial assessment results, and add child to user
childrenRouter.post('/', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, birthDate, gender, user, ageInMonths, vocabLogs } =
      req.body;

    const child = new Child({
      firstName,
      birthDate,
      gender,
      user,
      ageInMonths,
      vocabLogs,
    });

    await child.save();

    await User.findOneAndUpdate(
      { _id: user },
      { $push: { children: child } },
      { new: true }
    );

    res.json(child);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

childrenRouter.delete('/:id', async (req, res) => {
  await Child.findByIdAndRemove(req.params.id);
  res.status(204).end();
});

childrenRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const child = {
    firstName: body.firstName,
  };

  Child.findByIdAndUpdate(req.params.id, child, { new: true })
    .then((updatedChild) => {
      res.json(updatedChild);
    })
    .catch((error) => next(error));
});

module.exports = childrenRouter;
