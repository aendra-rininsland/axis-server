/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');

User.find({}).remove(function() {
  User.create({
    name : "Ændrew Rininsland (Ændrew)", 
    email : "aendrew.rininsland@the-times.co.uk", 
    provider : "google", 
    role : "admin"
  }, function() {
      console.log('finished populating users');
    }
  );
});