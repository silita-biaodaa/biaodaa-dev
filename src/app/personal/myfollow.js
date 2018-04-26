app.controller('MyfollowCtrl', ['$http','$uibModal','$log','$scope','$document',function($http,$uibModal, $log, $scope,$document) {
    var selt = this;

    this.clearData = function(){
        this.choiceCompanyList=false;
        this.param.type=null;
        selt.tenderList=null;
        selt.biddingList=null;
        selt.companyList=null;
    }

    //公共参数对象
    this.param = {
        pageNo: 1,
        pageSize: 5,
        type:'0'
    };
    this.choiceCompanyList=false;

    //查询收藏公告
    this.queryCollNoticeList = function (type) {
        this.clearData();
        this.param.type=type;
        console.log(this.param);
        $http.post("/userCenter/listCollectionNotice", angular.toJson(this.param)).success(function (result) {
            console.log(result);
            if (selt.param.type == 0) {
                selt.tenderList = result.data;
            } else if (selt.param.type == 2) {
                selt.biddingList = result.data;
            }
        });
    };


    //查询收藏企业
    this.queryCollComList = function () {
        this.clearData();
        this.choiceCompanyList=true;
        console.log(this.param);
        $http.post("/userCenter/listCollectionCompany", angular.toJson(this.param)).success(function (result) {
            console.log(result);
            selt.companyList=result.data;
        });
    };



    this.cancelCollectionNotice = function (noticeid,type){
        var cancelParam = {noticeid:noticeid};
        $http.post("/userCenter/cancelCollectionNotice", angular.toJson(cancelParam)).success(function (result) {
            console.log(result);
            if(result.code==1){//取消成功
                selt.queryCollNoticeList(type);
            }else{
                alert(result.msg);
            }
        });
    };

    this.cancelCollectionCompany = function (companyid){
        var cancelParam = {companyid:companyid};
        $http.post("/userCenter/cancelCollectionCompany", angular.toJson(cancelParam)).success(function (result) {
            console.log(result);
            if(result.code==1){//取消成功
                selt.queryCollComList();
            }else{
                alert(result.msg);
            }
        });
    };

    //页面初始化
    this.queryCollNoticeList('0');


}]);