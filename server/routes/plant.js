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
    created_at: Date.now(),
    cultivar: {
      name: req.body.cultivar.name,
      type: req.body.cultivar.type,
      source: req.body.cultivar.source,
      propagation: req.body.cultivar.propagation
    },
    location: req.body.location,
    method: req.body.method,
    planted_on: req.body.planted_on,
    germinated_on: req.body.germinated_on,
    note: req.body.note,
    entries: [],
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
      cultivar: {
        name: req.body.cultivar.name,
        type: req.body.cultivar.type,
        source: req.body.cultivar.source,
        propagation: req.body.cultivar.propagation
      },
      location: req.body.location,
      method: req.body.method,
      planted_on: req.body.planted_on,
      germinated_on: req.body.germinated_on,
      note: req.body.note,
    },
  };
  db.collection('plants')
    .updateOne(query, obj, function (err, res) {
      if (err) throw err;
      console.log('1 document updated');
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
      console.log('1 document deleted');
      response.json(obj);
  });
});

module.exports = plantRoutes;