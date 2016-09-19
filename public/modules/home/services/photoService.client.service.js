'use strict';

//Photo service used for communicating with the Photo REST endpoint
angular.module('home').factory('PhotoService', ['$http',
        function ($http) {
            return {
                search: function (params) {
                    return $http.post('/photo/search', params);
                },
                favorite: function (params) {
                    return $http.post('photo/favorite', params);
                }
            }
        }
])