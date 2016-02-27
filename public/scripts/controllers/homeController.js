//myApp.controller('PeopleController', ['$scope', 'DataFactory', function($scope, DataFactory) {
//    console.log('People Controller');
//
//    $scope.people = [];
//    $scope.dataFactory = DataFactory;
//    $scope.message = 'People!';
//    $scope.formName = '';
//
//    if($scope.dataFactory.peopleData() === undefined) {
//        // initial load
//        $scope.dataFactory.retrieveData().then(function() {
//            $scope.people = $scope.dataFactory.peopleData();
//        });
//    } else {
//        $scope.people = $scope.dataFactory.peopleData();
//    }
//
//    $scope.addPerson = function() {
//        $scope.dataFactory.addName($scope.formName);
//        $scope.formName = '';
//    }
//
//
//
//}]);

myApp.controller('HomeController', ['$scope', '$http', function($scope, $http) {
    $scope.message = 'Home Controller!';
    $scope.animal = {};


    $scope.petFinder = function() {

        // API key
        var key = '0805e1690cddb763f4f59ebe3be0a201';
        var animal =  $scope.animal;
        var baseURL = 'http://api.petfinder.com/';
        var query = 'pet.getRandom';
        query += '?key=' + key;
        query += '&animal=' + animal.animalSelect;
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

    //petFinder();

    console.log('Home Controller');
}]);