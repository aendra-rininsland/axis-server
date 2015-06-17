'use strict';

var _ = require('lodash');
var Chart = require('./chart.model');

// Get list of charts
exports.index = function(req, res) {
  Chart.find(function (err, charts) {
    if(err) { return handleError(res, err); }
    return res.json(200, charts);
  });
};

// Get a single chart
exports.show = function(req, res) {
  Chart.findById(req.params.id, function (err, chart) {
    if(err) { return handleError(res, err); }
    if(!chart) { return res.send(404); }
    return res.json(chart);
  });
};

// Creates a new chart in the DB.
exports.create = function(req, res) {
  Chart.create(req.body, function(err, chart) {
    if(err) { return handleError(res, err); }
    return res.json(201, chart);
  });
};

// Updates an existing chart in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Chart.findById(req.params.id, function (err, chart) {
    if (err) { return handleError(res, err); }
    if(!chart) { return res.send(404); }
    var updated = _.merge(chart, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, chart);
    });
  });
};

// Deletes a chart from the DB.
exports.destroy = function(req, res) {
  Chart.findById(req.params.id, function (err, chart) {
    if(err) { return handleError(res, err); }
    if(!chart) { return res.send(404); }
    chart.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}