'use strict';

/**
 * Module dependencies
 */
const fs = require('fs');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const config = require('./config');
const path = require('path');
const consolidate = require('consolidate');

module.exports = function (db) {
    //Initialize express app
    var app = express();

    // Setting application local variables
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.jsFiles = config.getJavaScriptAssets();
    app.locals.cssFiles = config.getCSSAssets();
    
     // Passing the request url to environment locals
    app.use(function(req, res, next) {
        res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        next();
    });

    // Showing stack errors
    app.set('showStackError', true);

    // Set swig as the template engine
    app.engine('server.view.html', consolidate[config.templateEngine]);

    // Set ejs as the template engine
    app.set('view engine', 'server.view.html');
    app.set('views', './server/views');

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
        limit: '50mb',
        extended: true
    }));
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(methodOverride());

    // CookieParser should be above session
    app.use(cookieParser());

    // Setting the app router and static folder
    app.use(express.static(path.resolve('./public')));

    // Globbing routing files
    config.getGlobbedFiles('./server/routes/**/*.js').forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });

    // Assume 'not found' in the error msgs is a 404. 
    app.use(function(err, req, res, next) {
        // If the error object doesn't exists
        if (!err) return next();

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    // Return Express server instance 
    return app;

}