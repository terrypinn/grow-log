const dbo = require('../dbo');

const ObjectId = require('mongodb').ObjectID

exports.plant_list = (req, res) => {
  const db = dbo.getDb();
  db.collection('plants')
    .find({})
    .toArray()
    .catch(err => res.status(500).json({ error: err }))
    .then(docs => res.json(docs));
};

exports.plant_detail = (req, res) => {
  const db = dbo.getDb();
  db.collection('plants')
    .findOne({ _id: ObjectId(req.params.id) })
    .catch(err => res.status(500).json({ error: err }))
    .then(doc => res.json(doc));
};

exports.plant_create = (req, res) => {
  const db = dbo.getDb();
  const doc = {
    name: req.body.name,
    created_on: Date.now(),
    source: req.body.source,
    type: req.body.type,
    propagation: req.body.propagation,
    location: req.body.location,
    method: req.body.method,
    planted_on: req.body.planted_on,
    germinated_on: req.body.germinated_on,
    note: req.body.note,
    logs: [],
  };
  db.collection('plants')
    .insertOne(doc)
    .catch(err => res.status(500).json({ error: err }))
    .then(() => res.sendStatus(201));
};

exports.plant_update = (req, res) => {
  const db = dbo.getDb();
  const update = {
    $set: {
      name: req.body.name,
      source: req.body.source,
      type: req.body.type,
      propagation: req.body.propagation,
      location: req.body.location,
      method: req.body.method,
      planted_on: req.body.planted_on,
      germinated_on: req.body.germinated_on,
      note: req.body.note,
    }
  };
  db.collection('plants')
    .updateOne({ _id: ObjectId(req.params.id) }, update)
    .catch(err => res.status(500).json({ error: err }))
    .then(() => res.sendStatus(204));
};

exports.plant_delete = (req, res) => {
  const db = dbo.getDb();
  db.collection('plants')
    .findOneAndDelete({ _id: ObjectId(req.params.id) })
    .catch(err => res.status(500).json({ error: err }))
    .then(doc => db.collection('logs')
      .deleteMany({ plant_id: doc._id })
      .catch(err => res.status(500).json({ error: err }))
      .then(() => res.sendStatus(204)));
};
