app.controller('FinancialCtrl', ['$http','$uibModal','$log','$scope','$document','userTemp',function($http,$uibModal, $log, $scope,$document,userTemp) {
    var selt = this;

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
    ];

    this.submit = function () {
        if (null != userTemp) {
            var username = angular.fromJson(userTemp).username;

        } else {
            alert('您未登录，暂不能申请保证金借款！');
        }
    }
}]);