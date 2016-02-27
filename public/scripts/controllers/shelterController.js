myApp.controller('ShelterController', ['$scope', '$http', function($scope, $http) {
    $scope.message = 'Shelter Controller!';
    $scope.data = {};
    $scope.shelter = {};
    $scope.zip = {};



    $scope.petFinder = function() {
        // API key
        var key = '0805e1690cddb763f4f59ebe3be0a201';
        var zip =  $scope.zip;
        var baseURL = 'http://api.petfinder.com/';
        var query = 'shelter.find';
        query += '?key=' + key;
        query += '&location=' + zip.value;
        query += '&count=5';
        query += '&format=json';

        var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
        console.log(request);
        console.log(zip);

        $http.jsonp(request).then(
            function(response) {
                $scope.shelter = response.data.petfinder.shelters.shelter;
                console.log($scope.shelter);
            }
        );
    }

    //petFinder();

    console.log('Shelter Controller');
}]);