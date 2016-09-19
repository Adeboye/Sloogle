'use strict';

const config = require('./config.js');
const Unsplash = require('unsplash-js');
var unsplash = new Unsplash.default({
    applicationId: config.unsplash.applicationId,
    secret: config.unsplash.secret,
    callbackurl: config.unsplash.callbackUrl,
    bearerToken: config.unsplash.bearerToken
});

unsplash['_callbackUrl'] = config.unsplash.callbackUrl

module.exports = unsplash;


