'use strict';

const core = require('../controllers/index.server.controller');

module.exports = function(app) {
    //Root routing
    app.route('/').get(core.index);
}