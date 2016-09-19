'use strict';

/**
 * Module dependencies
 */
const init = require('./config/init')();
const config = require('./config/config.js');
const db = require('./server/models/');

var initExpress = function() {
    const app = require('./config/express')();

    const webserver = app.listen(config.port);

    //Expose app
    exports = module.exports = app;

    console.log('Sloogle Application started on port' + config.port);
}

var connectDb = function () {
    //Connect to Postgres DB & sync models
    db.sequelize
        .sync()
        .then(function () {
            // Start server
            console.log("i was connected to the postgres server");
            initExpress();
        }, function (err) {
            console.error(err);
        });
}

connectDb();

