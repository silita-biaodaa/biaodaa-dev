app.controller('UcenterCtrl', ['$http','$uibModal','$log','$scope','$document', 'userTemp',function($http,$uibModal, $log, $scope,$document,userTemp) {
    var selt = this;
    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }


    $http.post("/userCenter/getUserTemp",null).success(function (result) {
        console.log(result.data);
        $scope.ucenter = result.data;
    });






    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };
}]);