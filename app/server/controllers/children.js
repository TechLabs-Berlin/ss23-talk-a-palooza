const childrenRouter = require('express').Router();
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
  const body = req.body;

  const user = await User.findById(body.userId);

  const child = new Child({
    firstname: body.firstname,
    birthdate: body.birthdate,
    gender: body.gender,
    user: user.id,
  });

  const savedChild = await child.save();
  user.children = user.children.concat(savedChild._id);
  await user.save();

  res.json(savedChild);
});

childrenRouter.delete('/:id', async (req, res) => {
  const child = await child.findByIdAndRemove(req.params.id);
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
