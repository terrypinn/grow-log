const dbo = require('../dbo');

const ObjectId = require('mongodb').ObjectID

exports.log_list = (req, res) => {
  const db = dbo.getDb();
  db.collection('logs')
    .find({ plant_id: ObjectId(req.params.plant_id) })
    .sort({ created_on: -1 })
    .toArray()
    .catch(err => res.status(500).json({ error: err }))
    .then(docs => res.json(docs));
};

exports.log_detail = (req, res) => {
  const db = dbo.getDb();
  db.collection('logs')
    .findOne({ _id: ObjectId(req.params.id) })
    .catch(err => res.status(500).json({ error: err }))
    .then(doc => res.json(doc));
};

exports.log_create = (req, res) => {
  const db = dbo.getDb();
  const doc = {
    plant_id: ObjectId(req.body.plant_id),
    created_on: req.body.created_on,
    type: req.body.type,
    note: req.body.note,
    images: req.body.images,
  };
  db.collection('logs')
    .insertOne(doc)
    .catch(err => res.status(500).json({ error: err }))
    .then(result => db.collection('plants')
      .updateOne({ _id: doc.plant_id }, { $push: { logs: result.insertedId } })
      .catch(err => res.status(500).json({ error: err }))
      .then(() => res.sendStatus(201)));
};

exports.log_update = (req, res) => {
  const db = dbo.getDb();
  const update = {
    $set: {
      created_on: req.body.created_on,
      type: req.body.type,
      note: req.body.note,
      images: req.body.images,
    },
  };
  db.collection('logs')
    .updateOne({ _id: ObjectId(req.params.id) }, update)
    .catch(err => res.status(500).json({ error: err }))
    .then(() => res.sendStatus(204));
};

exports.log_delete = (req, res) => {
  const db = dbo.getDb();
  db.collection('logs')
    .findOneAndDelete({ _id: ObjectId(req.params.id) })
    .catch(err => res.status(500).json({ error: err }))
    .then(doc => db.collection('plants')
      .updateOne({ _id: doc.value.plant_id }, { $pull: { logs: doc.value._id } })
      .catch(err => res.status(500).json({ error: err }))
      .then(() => res.sendStatus(204)));
};
