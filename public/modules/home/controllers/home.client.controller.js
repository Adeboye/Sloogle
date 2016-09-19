'use strict';

angular.module('home').controller('PhotoController', [
    '$scope',
    '$http',
    'PhotoService',
    function($scope, $http, PhotoService) {

        $scope.results = [];
        $scope.paging = null;

        function loadPages() {
            $scope.search($scope.searchTerm, $scope.paging ? $scope.paging.current : 1, false);

            $scope.currentPage = $scope.paging.current;
        }

        function PaginationInit(response) {
            $scope.paging = {}
            $scope.paging.total = response.total_pages;
            $scope.paging.current = 1;
            $scope.paging.align = 'center start';
            $scope.paging.onPageChanged = loadPages
        }

        $scope.search = function(searchtxt, pageno, paginate) {

            var params = {
                searchtxt: searchtxt,
                pageno: pageno
            };

            PhotoService.search(params)
                .success(function(response) {
                    if (paginate) {
                        PaginationInit(response);
                    }
                    $scope.results = response.results;
                }).error(function(response) {
                    console.log(response);
                });
        }

        $scope.favorite = function(picture) {
            var params = {
                    id: picture.id,
                    likedByUser: picture.liked_by_user
                }
            //If session already exists return
            if (sessionStorage.getItem(picture.id)) {
                return;
            }

            PhotoService.favorite(params)
                .success(function(response) {
                    //Set like on page and store liked photo in session 
                    //to prevent additional likes in current session
                    picture.slooglelike = picture.slooglelike ? picture.slooglelike + 1 : 1;
                    sessionStorage.setItem(picture.id, true);
                }).error(function(err) {
                    console.log(err);
                });
        }

        $scope.download = function(photo) {
            var downloadUrl = photo.urls.full;
            var name = photo.user.name;
            var anchor = angular.element('<a/>');
            anchor.attr({
                href: downloadUrl,
                target: '_blank',
                download: name
            })[0].click();
        }
    }
]);