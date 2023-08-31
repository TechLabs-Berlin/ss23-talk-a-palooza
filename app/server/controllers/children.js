const childrenRouter = require('express').Router();
const Child = require('../models/child');

childrenRouter.get('/', (req, res) => {
  Child.find({}).then((children) => {
    res.json(children);
  });
});

childrenRouter.get('/:id', (req, res, next) => {
  Child.findById(req.params.id)
    .then((child) => {
      if (child) {
        res.json(child);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

childrenRouter.post('/', (req, res, next) => {
  const body = req.body;

  const child = new Child({
    firstname: body.firstname,
    birthdate: body.birthdate,
    gender: body.gender,
    userId: body.userId,
  });

  child
    .save()
    .then((savedChild) => {
      res.json(savedChild);
    })
    .catch((error) => next(error));
});

childrenRouter.delete('/:id', (req, res, next) => {
  child
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

childrenRouter.put('/:id', (req, res, next) => {
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
