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
plantRoutes.route('/plants').get(function (request, response) {
  let db = dbo.getDb();
  db.collection('plants')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      response.json(result);
    });
});

// get plant by id
plantRoutes.route('/plant/:id').get(function (request, response) {
  let db = dbo.getDb();
  const query = { _id: ObjectId(request.params.id) };
  db.collection('plants')
    .findOne(query, function (err, result) {
      if (err) throw err;
      response.json(result);
    });
});

// create plant
plantRoutes.route('/plant').post(function (request, response) {
  let db = dbo.getDb();
  const obj = {
    name: request.body.name,
    createdOn: Date.now(),
    source: request.body.source,
    type: request.body.type,
    propagation: request.body.propagation,
    location: request.body.location,
    method: request.body.method,
    plantedOn: request.body.plantedOn,
    germinatedOn: request.body.germinatedOn,
    note: request.body.note,
    logs: [],
  };
  db.collection('plants')
    .insertOne(obj, function (err, result) {
      if (err) throw err;
      response.json(result);
    });
});

// update plant
plantRoutes.route('/plant/:id').put(function (request, response) {
  let db = dbo.getDb();
  const query = { _id: ObjectId(request.params.id) };
  const obj = {
    $set: {
      name: request.body.name,
      source: request.body.source,
      type: request.body.type,
      propagation: request.body.propagation,
      location: request.body.location,
      method: request.body.method,
      plantedOn: request.body.plantedOn,
      germinatedOn: request.body.germinatedOn,
      note: request.body.note,
    },
  };
  db.collection('plants')
    .updateOne(query, obj, function (err, result) {
      if (err) throw err;
      response.json(result);
    });
});

// delete plant
plantRoutes.route('/plant/:id').delete((request, response) => {
  let db = dbo.getDb();
  const query = { _id: ObjectId(request.params.id) };
  db.collection('plants')
    .deleteOne(query, function (err, result) {
      if (err) throw err;
      response.json(result);
    });
});

// create log
plantRoutes.route('/log/:id').post(function (request, response) {
  let db = dbo.getDb();
  const plantId = ObjectId(request.params.id);
  const obj = {
    plantId: plantId,
    createdOn: Date.now(),
    type: request.body.type,
    note: request.body.note,
    images: request.body.images,
  };
  db.collection('logs')
    .insertOne(obj, function (err, result) {
      if (err) throw err;

      db.collection('plants')
        .updateOne({ _id: plantId }, { $push: { logs: response.insertedId } }, function (err, result) {
          if (err) throw err;
        });

      response.json(result);
    });
});

// get logs for plant
plantRoutes.route('/logs/:id').get(function (request, response) {
  let db = dbo.getDb();
  const query = { plantId: ObjectId(request.params.id) };
  db.collection('logs')
    .find(query)
    .toArray(function (err, result) {
      if (err) throw err;
      response.json(result);
    });
});

// get log by id
plantRoutes.route('/log/:id').get(function (request, response) {
  let db = dbo.getDb();
  const query = { _id: ObjectId(request.params.id) };
  db.collection('logs')
    .findOne(query, function (err, result) {
      if (err) throw err;
      response.json(result);
    });
});

// update log
plantRoutes.route('/log/:id').put(function (request, response) {
  let db = dbo.getDb();
  const query = { _id: ObjectId(request.params.id) };
  const obj = {
    $set: {
      type: request.body.type,
      note: request.body.note,
      images: request.body.images,
    },
  };
  db.collection('logs')
    .updateOne(query, obj, function (err, result) {
      if (err) throw err;
      response.json(result);
    });
});

// delete log
plantRoutes.route('/log/:id').delete((request, response) => {
  let db = dbo.getDb();
  const query = { _id: ObjectId(request.params.id) };
  db.collection('logs')
    .findOne(query, function (err, result) {
      if (err) throw err;
      
      db.collection('plants')
        .updateOne({ _id: result.plantId }, { $pull: { logs: result._id } }, function (err, result) {
          if (err) throw err;
          
          db.collection('logs')
            .deleteOne(query, function (err, result) {
              if (err) throw err;
              response.json(result);
            });
        });
    });
});

module.exports = plantRoutes;