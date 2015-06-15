'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../auth.service');

var router = express.Router();

router
  .get('/', passport.authenticate('google', {
    failureRedirect: '/signup',
    session: false,
    scope: ['email']
  }))

  .get('/callback', passport.authenticate('google', {
    failureRedirect: '/signup',
    session: false,
    scope: ['email']
  }), auth.setTokenCookie);

module.exports = router;