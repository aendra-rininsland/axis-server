/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var Chart = require('./api/chart/chart.model.js');
var oembed = require('connect-oembed');
var hbs = require('express-hbs');

module.exports = function(app) {
  // Use HBS templates
  app.engine('hbs', hbs.express4(/*{
    partialsDir: __dirname + '/views/partials'
  }*/));
  app.set('view engine', 'hbs');
  app.set('views', __dirname + '/views');

  // API routes
  app.use('/api/charts', require('./api/chart'));
  app.use('/api/users', require('./api/user'));

  // OAuth routes for Passport
  app.use('/auth', require('./auth'));

  // OEmbed route
  app.use('/oembed', oembed(function(req, res, next) {
    var urlRegEx = /^http(?:s)?:\/\/[^\/]+\/chart\/([A-Z0-9]+)/i;
    var matched = urlRegEx.exec(req.oembed.url);
    if (matched !== null) {
      var chartId = matched[1];
      res.render('oembed.hbs', {
        id: chartId,
        width: req.oembed.width || '100%',
        height: req.oembed.height || '100%'
      }, function(err, html){
        res.oembed.rich(
          html,
          req.oembed.width || '100%',
          req.oembed.height || '100%',
          {
            provider_name: 'Axis',
            provider_url: req.get('host')
          }
        );
      });
    } else {
      next();
    }
  }));


  // Render a chart
  app.get('/chart/:id', function(req, res, next){
    Chart.findById(req.params.id, function (err, chart) {
      if (!chart) {
        res.status(404).send('Not found');
      } else {
        if ((req.headers.accept && req.headers.accept === 'application/json') ||
            (req.query.format && req.query.format === 'json')) {
          var jsonResponse = {
            axisJSON: chart.config,
            chartTitle: chart.title,
            oembedUrl: req.protocol + '://' + req.get('host') + '/oembed/?url=' + encodeURIComponent(req.protocol + '://' + req.get('host') + req.url.replace('format=json', ''))
          };
          res.json(jsonResponse);
        } else {
          res.render('chart.hbs', {
            chartTitle: chart.title,
            axisJSON: chart.config,
            oembedUrl: req.protocol + '://' + req.get('host') + '/oembed/?url=' + encodeURIComponent(req.protocol + '://' + req.get('host') + req.url)
          });
        }
      }
    });
  });

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
