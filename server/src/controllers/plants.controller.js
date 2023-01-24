const Log = require('../models/Log');
const Plant = require('../models/Plant');

exports.plant_list = (req, res) => {
  Plant.find().sort({ created_on: 1 }).then(docs => res.json(docs));
};

exports.plant_detail = (req, res) => {
  Plant.findById(req.params.id).then(doc => res.json(doc));
};

exports.plant_create = (req, res) => {
  const doc = new Plant({ ...req.body, created_on: Date.now() });
  Plant.create(doc).then(() => res.sendStatus(201));
};

exports.plant_update = (req, res) => {
  const doc = new Plant({ ...req.body });
  Plant.findByIdAndUpdate(req.params.id, doc).then(() => res.sendStatus(204));
};

exports.plant_delete = (req, res) => {
  Plant.findByIdAndDelete(req.params.id).then(doc =>
    Log.deleteMany({ plant_id: doc._id }).then(() => res.sendStatus(204)));
};
