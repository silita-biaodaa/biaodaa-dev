app.controller('MessagesCtrl', ['$http','$uibModal','$log','$scope','$document', 'userTemp',function($http,$uibModal, $log, $scope,$document, userTemp) {
    var selt = this;

    this.getMessage = function (isSystem) {
        selt.isSystem = isSystem
        var articleParam = {
            pageNo: 1,
            pageSize: 5,
            isSystem: isSystem,
            userid:""
        };
        $http.post("/userCenter/listMessageByUserId", angular.toJson(articleParam)).success(function (result) {
            console.log(result);
            if(result.code == 1) {
                selt.messageList = result.data;
            }
        });
    };

    //页面初始化请求
    this.getMessage(0);
}]);