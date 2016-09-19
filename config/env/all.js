'use strict';

module.exports = {
    app:{
        title: 'Sloogle app',
        description: 'The greatest image search engine ever!'
    },
    port: process.env.PORT || 8080,
    db: {
        host: 'ec2-54-243-203-93.compute-1.amazonaws.com',
        name: 'd9dib345e7d3tt',
        username: 'sffdsplmiixgxo',
        password: 'xGY1K7gIAArWM8zh85axkQYdkR'
    },
    unsplash: {
        applicationId: "f15c06db461eaa225299c47c8eb564901b1b55f770050e6d7d1e5213b365b538",
        secret: "16dbf5777ec6ac56b45258c3d3c3af40ce7858160ecaa6fab95073bc54f8816c",
        callbackUrl: "http://127.0.0.1:8080/photo/callback",
        bearerToken: "3a6e3f9028c4383cb3682d9121cd8052497fcc286e827c5d586ca438513676d0",
        searchUrl: "https://api.unsplash.com/search"
    },
    templateEngine: 'swig',
    assets: {
        lib: {
            css: [
                'public/lib/angular/angular-csp.css',
                'public/lib/angular-material/angular-material.css',
                'public/lib/angular-material/themes/blue-theme.css',
                '//fonts.googleapis.com/css?family=RobotoDraft:400,500,700,400italic',
                'https://code.getmdl.io/1.2.1/material.indigo-pink.min.css',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
                'https://code.getmdl.io/1.2.1/material.indigo-pink.min.css'
            ],
            js: [
                'public/lib/angular/angular.min.js',
                'public/lib/angular-animate/angular-animate.min.js',
                'public/lib/angular-aria/angular-aria.min.js',
                'public/lib/angular-messages/angular-messages.js',
                'public/lib/angular-material/angular-material.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/material-angular-paging/build/dist.min.js',
                'public/lib/lodash/dist/lodash.min.js'
            ]
        },
        css: [
                'public/modules/**/css/*.css'
        ],
        js: [
            'public/config.js',
            'public/application.js',
            'public/modules/*/*.js',
            'public/modules/**/**.js'
        ],
        tests: []
    }
};