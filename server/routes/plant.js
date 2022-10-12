const express = require('express');

// plantRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /plant(s).
const plantRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId;

// get all plants
plantRoutes.route('/plants').get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection('plants')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// get plant by id
plantRoutes.route('/plant/:id').get(function (req, res) {
  let db = dbo.getDb();
  let query = { _id: ObjectId(req.params.id) };
  db.collection('plants')
    .findOne(query, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// create plant
plantRoutes.route('/plant').post(function (req, response) {
  let db = dbo.getDb();
  let obj = {
    created_on: Date.now(),
    entries: [],
    germinated_on: req.body.germinated_on,
    location: req.body.location,
    method: req.body.method,
    name: req.body.name,
    note: req.body.note,
    planted_on: req.body.planted_on,
    propagation: req.body.propagation,
    source: req.body.source,
    type: req.body.type,
  };
  db.collection('plants')
    .insertOne(obj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

// update plant
plantRoutes.route('/plant/:id').put(function (req, response) {
  let db = dbo.getDb();
  let query = { _id: ObjectId(req.params.id) };
  let obj = {
    $set: {
      germinated_on: req.body.germinated_on,
      location: req.body.location,
      method: req.body.method,
      name: req.body.name,
      note: req.body.note,
      planted_on: req.body.planted_on,
      propagation: req.body.propagation,
      source: req.body.source,
      type: req.body.type,
    },
  };
  db.collection('plants')
    .updateOne(query, obj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

// delete plant
plantRoutes.route('/plant/:id').delete((req, response) => {
  let db = dbo.getDb();
  let query = { _id: ObjectId(req.params.id) };
  db.collection('plants')
    .deleteOne(query, function (err, obj) {
      if (err) throw err;
      response.json(obj);
    });
});

/*** plant entry ***/

// create
plantRoutes.route('/plant/:id/entry').post(function (req, response) {
  let db = dbo.getDb();
  let query = { _id: ObjectId(req.params.id) };
  let obj = {
    $push: {
      entries: {
        _id: new ObjectId(),
        created_on: Date.now(),
        note: req.body.note,
        images: req.body.images,
        type: req.body.type,
      }
    },
  };
  db.collection('plants')
    .updateOne(query, obj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
});

// get plant entries 
plantRoutes.route('/plant/:id/entry').get(function (req, res) {
  let db = dbo.getDb();
  // let query = ;
  db.collection('plants')
    .find({ _id: ObjectId(req.params.id) }, { entries: 1}, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

module.exports = plantRoutes;