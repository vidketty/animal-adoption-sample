const express = require('express');
const routes = express.Router();
const config = require('./../config');

// Require animal model in our routes module
let Animal = require('../models/animal');

routes.route('/add').post(function (req, res) {

  const { name, gender, type } = req.body;
  let animal = new Animal({
    name,
    gender,
    type,
    adopted: false
  });

  animal.save()
    .then(animal => {
      res.status(200).json({ 'animal': 'animal in added successfully' });
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });
});

/**
 * @params pageNo: required. should >= 1.
 * @params size: required. default = 15.
 * @returns [] // all animals available for the requested pageNo.
 *
 */

routes.route('/available').get(function (req, res) {
  var pageNo = parseInt(req.query.pageNo);
  var size = parseInt(req.query.size) || config.pagination.size;

  var query = {}
  if (pageNo < 0 || pageNo === 0) {
    response = { "error": true, "message": "invalid page number, should start with 1" };
    return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size

  // Find some documents
  Animal.find({
    adopted: false
  }, {}, query, function (err, animales) {
    if (err) {
      response = { "error": true, "message": "Error fetching data" };
    } else {
      response = animales;
    }
    res.json(response);
  });
});

/**
 * @params pageNo: required. should >= 1.
 * @params size: required. default = 15.
 * @returns [] // all animals available for the requested pageNo.
 *
 */

routes.route('/adopted').get(function (req, res) {
  var pageNo = parseInt(req.query.pageNo);
  var size = parseInt(req.query.size) || config.pagination.size;

  var query = {};
  if (pageNo < 0 || pageNo === 0) {
    response = { "error": true, "message": "invalid page number, should start with 1" };
    return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size

  // Find some documents
  Animal.find({
    adopted: true
  }, {}, query, function (err, animales) {
    if (err) {
      response = { "error": true, "message": "Error fetching data" };
    } else {
      response = animales;
    }
    res.json(response);
  });
});

/**
 * @params pageNo: required. should >= 1.
 * @params size: required. default = 15.
 * @returns [] // all animals available for the requested pageNo.
 *
 */

routes.route('/').get(function (req, res) {
  let pageNo = parseInt(req.query.pageNo);
  let size = parseInt(req.query.size) || config.pagination.size;

  let query = {};
  let queryStr = {
    adopted: false
  };
  const type = req.body.type;

  if (type) queryStr.type = type;

  if (pageNo < 0 || pageNo === 0) {
    response = { "error": true, "message": "invalid page number, should start with 1" };
    return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size

  // Find some documents
  Animal.find(queryStr, {}, query, function (err, animales) {
    if (err) {
      response = { "error": true, "message": "Error fetching data" };
    } else {
      response = animales;
    }
    res.json(response);
  });
});

/**
 * @params pageNo: required. should >= 1.
 * @params size: required. default = 15.
 * @returns [] // all animals available for the requested pageNo.
 *
 */

routes.route('/search').get(function (req, res) {
  let pageNo = parseInt(req.query.pageNo);
  let size = parseInt(req.query.size) || config.pagination.size;
  let query = {};
  let searchQuery = req.query.searchQuery;

  if (pageNo < 0 || pageNo === 0) {
    response = { "error": true, "message": "invalid page number, should start with 1" };
    return res.json(response)
  }
  query.skip = size * (pageNo - 1)
  query.limit = size

  // Find some documents
  Animal.find({
    name: { $regex: searchQuery }
  }, {}, query, function (err, animales) {
    if (err) {
      response = { "error": true, "message": "Error fetching data" };
    } else {
      response = animales;
    }
    res.json(response);
  });
});

routes.route('/update/:id').get(function (req, res) {
  let id = req.params.id;
  let body = req.body;
  Animal.findById(id, async function (err, animal) {
    if (animal) {
      const data = Object.assign(animal, body);
      const updatedAnimal = await Animal.findOneAndUpdate({ _id: id }, data);
      return res.json(updatedAnimal);
    }
  });
});

routes.route('/adopted').get(function (req, res) {
  Animal.find({ adopted: true }, function (err, animals) {
    if (err) res.json(err);
    else res.json(animals);
  });
});

routes.route('/adopt/:id').post(function (req, res) {
  const id = req.params.id;
  Animal.findOneAndUpdate({ _id: id }, { $set: { adopted: true } }, function (err, animals) {
    if (err) res.json(err);
    else res.json(animals);
  });
});

routes.route('/adoption/chart-data').post(function (req, res) {

  Animal.aggregate(
    [
      {
        $group: {
          _id: '$type'
        }
      }
    ]
  ).then((err, animals) => {
    res.send(animals)
  });
});

routes.route('/adoption/chart-data').post(function (req, res) {

  Animal.find({
    added
  }, {}).then((err, animals) => {
    res.send(animals)
  });
});


module.exports = routes;