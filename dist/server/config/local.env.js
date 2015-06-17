'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN:           'http://localhost:9000',
  SESSION_SECRET:   'axismaker-secret',

  GOOGLE_CLIENT_ID: '553810632246-1kpjtnd7c00fnalblq724k1meid140vi.apps.googleusercontent.com',
  GOOGLE_CLIENT_SECRET: '5SiDGxvr-vq0shExl-nrl0DT',
  GOOGLE_CALLBACK_URL: 'http://localhost:9000/auth/google/callback',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
