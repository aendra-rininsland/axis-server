# Axis Server
## 2015 Ændrew Rininsland [@aendrew](http://www.twitter.com/aendrew)

This is a MongoJS/Express/Bootstrap-based CRUD wrapper for [AxisJS](http://github.com/times/axisJS).

What this means is that you can create and save charts with ease using its interface.

### Cool features

#### OEmbed

To get an OEmbed version of a chart, just query:

`http://axis.yourdomain.com/oembed/?url=<url-to-chart>&width=<chart-width>&height=<chart-height>`

### Building and Deployment

1. To build:
  + `npm install && bower install`
  + `grunt build`
    + You'll need grunt-cli installed: `npm install -g grunt-cli`
2. Deploy (To Heroku, for example)!
  + `cd dist/ && heroku create`
  + `heroku addons:add mongolab`
  + `heroku config:set GOOGLE_CLIENT_ID="<your-client-id>" GOOGLE_CLIENT_SECRET="<your-client-secret> GOOGLE_CALLBACK_URL="http://<your-domain>/auth/google/callback" MONGOLAB_URI="<your-mongolab-uri>"`
  + `cd .. && grunt buildcontrol:heroku`
3. From then on, just do `grunt buildcontrol:heroku` in the project root after building.

### Roadmap

+ I might add support to save to S3.

