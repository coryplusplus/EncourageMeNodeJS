(function () {

    var app = angular.module("EncourageMe");



    var MainController = function ($scope, $http) {
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

        var onReposComplete = function onReposComplete(response) {
            $scope.repos = response.data;
        }

        var onUserComplete = function onUserComplete(response) {
            $scope.error = null
            $scope.user = response.data;
            $http.get("https://api.github.com/users/" + $scope.username + "/repos")
                .then(onReposComplete, onError);

        }

        var onError = function onError(reason) {
            $scope.error = reason;
        }

        $scope.search = function (username) {
            if (!username) {
                onError("Plese enter a username")
                return;
            }
            $http.get("https://api.github.com/users/" + username)
                .then(onUserComplete, onError);
        }


        setAuthorizationHeader("tomcat", "Nscck20!3");
        populateProfiles();
        populateMoreEncouragements();


        function setAuthorizationHeader(username, authtoken) {

            var credentials = btoa(username + ':' + authtoken);

            $http.defaults.headers.common['Authorization'] = 'Basic ' + credentials;

        }

        function populateProfiles() {
            return $http.get(profiles_url)
                .then(function (response) {
                    $scope.profiles = response.data;
                });
        }

        function populateMoreEncouragements() {
            encouragements_url = base_url + "ideas/?start=" + eStart + "&size=" + eSize;
            return $http.get(encouragements_url)
                .then(function (response) {
                    if (response.data.length == 0)
                        $scope.allEncouragementsLoaded = true
                    angular.forEach(response.data, function (data) {
                        var dates = data["created"].split("T");
                        var date = new Date(dates[0]);
                        var now = new Date();
                        var timeDiff = Math.abs(now.getTime() - date.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                        data["timeSince"] = diffDays;
                        $scope.encouragements.push(data);
                        populateRecentComments(data["id"], data["ideaName"]);
                    });
                    eStart += 10;
                });
        }

        $scope.populateEncouragements = function () {
            populateMoreEncouragements();

        }

        $scope.populateComments = function (id) {
            encouragements_url = base_url + "ideas/" + id + "/comments";
            $scope.comments = [];
            return $http.get(encouragements_url)
                .then(function (response) {
                    angular.forEach(response.data, function (data) {
                        $scope.comments.push(data);
                    });

                });

        }

        function populateRecentComments(objectId, ideaName) {
            encouragements_url = base_url + "ideas/" + objectId + "/comments?start=" + cStart + "&size=" + cSize;
            return $http.get(encouragements_url)
                .then(function (response) {
                    if (response.data.length == 0)
                        $scope.allEncouragementsLoaded = true
                    angular.forEach(response.data, function (data) {
                        data["ideaName"] = ideaName;
                        $scope.recentComments.push(data);
                    });

                });

        }
    };


    app.controller("MainController", MainController);

})();