myApp.controller('HomeController', ['$scope', '$http', function($scope, $http) {
    $scope.message = 'Home Controller!';
    $scope.data = {};
    $scope.animal = {};

    $scope.petFinder = function() {

        // API key
        var key = '0805e1690cddb763f4f59ebe3be0a201';
        var baseURL = 'http://api.petfinder.com/';
        var query = 'pet.getRandom';
        var animal = $scope.animal;
        query += '?key=' + key;
        query += '&animal=' + animal;
        query += '&output=basic';
        query += '&format=json';

        var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
        console.log(request);

        $http.jsonp(request).then(
            function(response) {
                $scope.animal = response.data.petfinder.pet;
                console.log($scope.animal);
            }
        );
    }

    $scope.favorite = function() {

        var animal = $scope.animal;

        postFavorite(animal);
        console.log(animal);

        function postFavorite(data) {
            $http.post('/post_fav', data).then(function(response) {
                console.log('posting');
            });
        };
    }

    console.log('Home Controller');
}]);