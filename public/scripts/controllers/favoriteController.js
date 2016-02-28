myApp.controller('FavoriteController', ['$scope', 'DataFactory', function($scope, DataFactory) {
    console.log('Favorite Controller');

    $scope.dataFactory = DataFactory;


}]);