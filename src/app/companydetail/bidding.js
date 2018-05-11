app.controller('BiddingCtrl', ['$http', 'userTemp','utils','$state',function($http,userTemp,utils,$state) {
    var self = this;
    if (userTemp != null) {
        self.user = angular.fromJson(userTemp);
    } else {
        self.user = null;
    }

    this.proId = $state.params.proId;

    this.detailShow = false;
    this.projectZhongbiaoList = []
    this.initProZhaotou = function () {
        var param = {
            proId:self.proId,
            tabType:"zhaotoubiao"
        }
        $http.post("/project/company/detail",angular.toJson(param)).success(function (result) {
            if(result.code == 1){
                self.projectZhongbiaoList = result.data;
                console.log(self.projectZhongbiaoList);
                angular.forEach(self.projectZhongbiaoList,function (item) {
                    item.isShow = false;
                })
            }else {
                alert('查询列表失败');
            }
        })
    };

    this.zhaoProjectDetail = {}
    this.projectZhaoDetail = function (pkid,company,zhaoType,showType) {
        if(showType==true){
            angular.forEach(self.projectZhongbiaoList,function (item) {
                    item.isShow = false;
            })
            return ;
        }
        var zhaoParam = {
            proId:self.proId,
            tabType:"zhaotoubiao",
            pkid:pkid,
            company:company,
            zhaobiaoType:zhaoType
        }
        $http.post("/project/list/detail",angular.toJson(zhaoParam)).success(function (result) {
            self.zhaoProjectDetail = result.data;
            angular.forEach(self.projectZhongbiaoList,function (item) {
                if(item.pkid == pkid){
                    item.isShow = !item.isShow;
                }else{
                    item.isShow = false;
                }
            })
            console.log(self.zhaoProjectDetail);
        });
    };

    this.initProZhaotou();
}]);