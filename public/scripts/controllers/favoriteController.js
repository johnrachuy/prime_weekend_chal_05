myApp.controller('FavoriteController', ['$scope', '$http', function($scope, $http) {
    console.log('Favorite Controller');
    $scope.data = {};
    $scope.animal = {};

    //$scope.dataFactory = DataFactory;

    $http({
        method: 'GET',
        url: '/get_fav'
    }).then(function(response) {
        var data = response.data;
        console.log(data);
        $scope.animal = response.data;
    });

    $scope.remove = function(id) {
        removeFavorite(id);
        console.log(id);
    }

    function removeFavorite(data) {
        $http.put('/remove_fav', {id:data}).then(function(response) {

        });
    };

}]);