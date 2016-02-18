(function () {

    var app = angular.module("EncourageMe", []);



    var CommentController = function ($scope, $http) {
        var eStart = 0;
        var eSize = 10;
        var cStart = 0;
        var cSize = 3;

        var base_url = "https://api.encourageme.cipricoresolutions.com:8443/encourageMe/webapi/v1/"
        var profiles_url = base_url + "profiles";
        var encouragements_url = base_url + "ideas/?start=" + eStart + "&size=" + eSize;
        $scope.encouragements = [];
        $scope.recentComments = [];
        $scope.comments = [];
        $scope.title = "Encourage-Me"
        $scope.repoSortOrder = "-stargazers_count";
        $scope.message = "This is a blast";

        $scope.error = null
        $scope.objectId = window.objectId




        setAuthorizationHeader("tomcat", "Nscck20!3");



        function setAuthorizationHeader(username, authtoken) {

            var credentials = btoa(username + ':' + authtoken);

            $http.defaults.headers.common['Authorization'] = 'Basic ' + credentials;

        }



        $scope.populateComments = function () {
            console.log("populate comments called");
            encouragements_url = base_url + "ideas/" + $scope.objectId + "/comments";
            $scope.comments = [];
            return $http.get(encouragements_url)
                .then(function (response) {
                    angular.forEach(response.data, function (data) {
                        $scope.comments.push(data);
                    });

                });

        }


    };


    app.controller("CommentController", CommentController);

})();