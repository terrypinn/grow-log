const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Log = require('../models/Log');
const Plant = require('../models/Plant')

exports.log_list = (req, res) => {
  const filter = { plant_id: ObjectId(req.params.plant_id) };
  Log
    .find(filter)
    .sort({ created_on: -1 })
    .catch(err => res.status(500).json({ error: err }))
    .then(docs => res.json(docs));
};

exports.log_detail = (req, res) => {
  Log
    .findById(req.params.id)
    .catch(err => res.status(500).json({ error: err }))
    .then(doc => res.json(doc));
};

exports.log_create = (req, res) => {
  const doc = new Log({ ...req.body });
  Log
    .create(doc)
    .catch(err => res.status(500).json({ error: err }))
    .then(result =>
      Plant
        .findByIdAndUpdate(result.plant_id, { $push: { logs: result._id } })
        .catch(err => res.status(500).json({ error: err }))
        .then(() => res.sendStatus(201)));
};

exports.log_update = (req, res) => {
  const doc = new Log({ ...req.body });
  Log
    .findByIdAndUpdate(req.params.id, doc)
    .catch(err => res.status(500).json({ error: err }))
    .then(() => res.sendStatus(204));
};

exports.log_delete = (req, res) => {
  Log
    .findByIdAndDelete(req.params.id)
    .catch(err => res.status(500).json({ error: err }))
    .then(result =>
      Plant
        .findByIdAndUpdate(result.plant_id, { $pull: { logs: result._id } })
        .catch(err => res.status(500).json({ error: err }))
        .then(() => res.sendStatus(204)));
};
