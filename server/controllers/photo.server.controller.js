'use strict';

const https = require('https');
const request = require('request');
const config = require('../../config/config.js');
const unsplash = require('../../config/unsplash.js')
const models = require('../models');

var noofFavorites = function (res, json) {
    var LikedByUser = []; 
    json.results.map(function(elem) {
        if(elem.liked_by_user) {
            LikedByUser.push(elem.id);
        } 
    })

    if(LikedByUser === undefined || LikedByUser.length == 0) {
        return res.jsonp(json);
    }

    //Compare photos in search result that are liked by Main User
    //to photo in database to retrieve no of Likes
    models.sequelize.sync().then(function () {
        var photos = models.photos;
        photos.findAll({
            where: {
                id: LikedByUser
            }
        }).then(function (result) {
            result.map(function (elem) {
                json.results.map(function (nestelem) {
                    if(nestelem.id === elem.dataValues.id) {
                        nestelem.slooglelike = elem.dataValues.likes;
                    }
                })
            })
            return res.jsonp(json);
        })
    })
}

exports.favorite = function (req, res) {
    var id = req.body.id;
    var likedByUser = req.body.likedByUser;

    //Create entry in database for new picture update unsplash to like the picture
    unsplash.photos.likePhoto(id)
    .then(function (response) {
        models.sequelize.sync().then(function () {
            var photos = models.photos;
            //If picture not liked by Main User create entry in database for picture
            if(!likedByUser) {
                var createdPhoto = photos.create({
                    id: id,
                    likes: 1
                });
                res.jsonp();
            } else {
               photos.findById(id).then(function(photo) {
                    photo.increment('likes');
                    res.jsonp();
               });
            }
        });
    });
};

exports.search = function (req, res) {
    var searchtext = req.body.searchtxt;
    var pageno = req.body.pageno;
    unsplash.search.photos(searchtext, pageno) 
    .then(function (response) {
        return response.json();
    }).then(function (json) {
       //res.jsonp(json);
       noofFavorites(res, json);
    }).catch(function (err) {
        console.log(err);
    })
}

//Oauth 2 authentication for unsplash Api
exports.callback = function (response) {
    
    var code = response.query.code;
    var oauthurl = "unsplash.com";
    var path = '/oauth/token?client_id=f15c06db461eaa225299c47c8eb564901b1b55f770050e6d7d1e5213b365b538&client_secret=16dbf5777ec6ac56b45258c3d3c3af40ce7858160ecaa6fab95073bc54f8816c' 
        + '&redirect_uri=http://127.0.0.1:8080/photo/callback&code=' + code + '&grant_type=authorization_code'; 

    var options = {
        host: oauthurl,
        path: path,
        method: 'POST'
    }

    https.request(options, function (res) {
        console.log(res);
         console.log('STATUS: ' + res.statusunauCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
        });
    }).end();  
};