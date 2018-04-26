

app.controller('userCenterCtrl', ['$http','$uibModal','$log','$scope','$document',function($http,$uibModal, $log, $scope,$document) {
	var selt = this;

    $http.get("/company/filter").success(function (result) {
        if(result.code==1){
            selt.areaList = result.data.area;
        }
    });

}]);
