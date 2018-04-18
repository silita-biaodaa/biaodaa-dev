
app.controller('tenderCtrl', ['$http','$scope','utils',function($http,$scope, utils) {
    var selt = this;

    $http.get("/company/filter").success(function (result) {
        console.log(result.data.area);



}]);