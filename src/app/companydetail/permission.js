app.controller('PermissionCtrl', ['$http', 'userTemp','utils','$state',function($http,userTemp,utils,$state) {
    var self = this;
    if (userTemp != null) {
        self.user = angular.fromJson(userTemp);
    } else {
        self.user = null;
    }
    this.proId = $state.params.proId;

    this.projectBuildList = []
    this.initBuild = function () {
        var param = {
            proId:self.proId,
            tabType:"build"
        }

        $http.post("/project/company/detail",angular.toJson(param)).success(function (result) {
            if(result.code == 1){
                self.projectBuildList = result.data;
                console.log(self.projectBuildList);
            }else {
                alert('查询列表失败');
            }
        })
    };

    this.initBuild();
    this.showBuild = false;
    this.buildDetail = {};
    this.projectBuildDetail = function (pkid) {
        self.showBuild = !self.showBuild;

        var buildParam = {
            proId:self.proId,
            tabType:"build",
            pkid:pkid,
        }
        $http.post("/project/list/detail",angular.toJson(zhaoParam)).success(function (result) {
            self.buildDetail = result.data;
            console.log(self.buildDetail);
        });
    }
}]);