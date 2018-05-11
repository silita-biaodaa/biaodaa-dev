app.controller('ProjectDetailOneCtrl', ['$http', 'userTemp','utils',function($http,$uibModal, $log, $scope,$document,userTemp,utils) {
    var self = this;
    if (userTemp != null) {
        self.user = angular.fromJson(userTemp);
    } else {
        self.user = null;
    }

    this.tst="112233";


    self.proId = utils.getUrlVar("proId");

    var param = {
        id:self.proId
    };

    $http.post("/project/detail",angular.toJson(param)).success(function (result) {
        if(result.code == 1){
            self.projectDetail = result.data;
            console.log(self.projectDetail);
        }else{
            alert('获取详细信息失败');
        }
    })
}]);