app.controller('CensorCtrl', ['$http', 'userTemp','utils','$state',function($http,userTemp,utils,$state) {
    var self = this;
    if (userTemp != null) {
        self.user = angular.fromJson(userTemp);
    } else {
        self.user = null;
    }

    this.proId = $state.params.proId;

    this.projectDesignList = []
    this.initDesign = function () {
        var param = {
            proId:self.proId,
            tabType:"design"
        }

        $http.post("/project/company/detail",angular.toJson(param)).success(function (result) {
            if(result.code == 1){
                self.projectDesignList = result.data;
                angular.forEach(self.projectDesignList,function (item) {
                    item.isDesignShow = false;
                })
                console.log(self.projectDesignList);
            }else {
                alert('查询列表失败');
            }
        })
    };

    this.initDesign();
    this.showDesign = false;
    this.designDetail = {};
    this.projectDesignDetail = function (pkid,designType) {
        if(designType == true){
            angular.forEach(self.projectDesignList,function (item) {
                    item.isDesignShow = false;
            })
            return;
        }
        var zhaoParam = {
            proId:self.proId,
            tabType:"design",
            pkid:pkid,
        }
        $http.post("/project/list/detail",angular.toJson(zhaoParam)).success(function (result) {
            self.designDetail = result.data;
            angular.forEach(self.projectDesignList,function (item) {
                if(item.pkid == pkid){
                    item.isDesignShow = !item.isDesignShow;
                }else {
                    item.isDesignShow = false;
                }
            })
            console.log(self.designDetail);
        });
    }
}]);