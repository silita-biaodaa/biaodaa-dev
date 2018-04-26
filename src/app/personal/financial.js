app.controller('FinancialCtrl', ['$http','$uibModal','$log','$scope','$document',function($http,$uibModal, $log, $scope,$document) {
    var selt = this;

    /*$http.post("/foundation/getProvinceCity", angular.toJson({})).success(function (result) {
        if (result.code == 1) {
            alert(result.data);
        }
    });*/


    $scope.selectDatas = [{
        "name": "湖南省",
        "citys": [
            {"name":"株洲"},
            {"name":"湘潭"},
            {"name":"常德"},
            {"name":"郴州"},
            {"name":"怀化"},
            {"name":"衡阳"},
            {"name":"娄底"},
            {"name":"邵阳"},
            {"name":"湘西"},
            {"name":"益阳"},
            {"name":"岳阳"},
            {"name":"永州"},
            {"name":"张家界"}
        ]
        }
    ]
}]);