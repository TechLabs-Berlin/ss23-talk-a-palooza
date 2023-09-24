const childrenRouter = require('express').Router();
const { validationResult } = require('express-validator');
const Child = require('../models/child');
const User = require('../models/user');

//[x] GET all children
childrenRouter.get('/', async (req, res) => {
  const children = await Child.find({});
  res.json(children);
});

//[x] GET a child by id and populate spokenWords
childrenRouter.get('/:id', async (req, res) => {
  const child = await Child.findById(req.params.id).populate({
    path: 'vocabLogs',
    populate: {
      path: 'spokenWords',
      model: 'SpokenWords',
      populate: {
        path: 'wordBankId',
        model: 'WordBank',
      },
    },
  });
  if (child) {
    res.json(child);
  } else {
    res.status(404).end();
  }
});

//[x] GET all vocablogs for a child
childrenRouter.get('/:id/vocablogs', async (req, res) => {
  const child = await Child.findById(req.params.id).populate({
    path: 'vocabLogs',
    populate: {
      path: 'spokenWords',
      model: 'SpokenWords',
      // populate: {
      //   path: 'wordBankId',
      //   model: 'WordBank',
      // },
    },
  });
  if (child) {
    res.json(child.vocabLogs);
  } else {
    res.status(404).end();
  }
});

//[x] GET the last vocabLog for a child.
// Usecase: send to DS for their recommender
childrenRouter.get('/:id/vocab', async (req, res) => {
  try {
    const child = await Child.findById(req.params.id).populate({
      path: 'vocabLogs',
      options: {
        sort: { createdAt: -1 }, // Sort by createdAt in descending order to get the most recent
        limit: 1, // Limit the result to just one document (the latest)
      },
      populate: {
        path: 'spokenWords',
        model: 'SpokenWords',
      },
    });

    if (child && child.vocabLogs.length > 0) {
      res.json(child.vocabLogs[0]); // Send the most recent vocabLog
    } else {
      res.status(404).json({ message: 'No vocabLogs found for this child.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
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
