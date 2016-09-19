'use strict';

module.exports = function(app) {
    //Root routing
    var photo = require('../controllers/photo.server.controller');
    var express = require('express');
    var router = express.Router();

    app.route('/photo/callback') 
        .get(photo.callback);
    
    app.route('/photo/search')
        .post(photo.search);

    app.route('/photo/favorite')
        .post(photo.favorite);
        
}