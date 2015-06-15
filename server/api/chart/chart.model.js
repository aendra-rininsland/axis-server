'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ChartSchema = new Schema({
  title: String,
  owner: String,
  config: Object,
  timestamp: Number
});

module.exports = mongoose.model('Chart', ChartSchema);