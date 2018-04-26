app.controller('MyfollowCtrl', ['$http','$uibModal','$log','$scope','$document',function($http,$uibModal, $log, $scope,$document) {
    var selt = this;

    this.clearAllList =function(){
        selt.biddingList=null;
        selt.tenderList=null;
        selt.companyList = null;
        selt.param.pageNo=1;
    }

    this.clearData = function(type){
        this.choiceCompanyList=false;
        this.param.type=null;
        if(type){
            selt.companyList = null;
            if (type == 0) {
                selt.biddingList=null;
            } else if (type == 2) {
                selt.tenderList=null;
            }
        }else {
            selt.biddingList=null;
            selt.tenderList=null;
        }
        this.resultLength=0;
        selt.returnPageNum=0;
    }

    this.resultLength=0;

    //公共参数对象
    this.param = {
        pageNo: 1,
        pageSize: 5,
        type:'0'
    };
    this.choiceCompanyList=false;

    this.showTailInfo =function (listData,length){
        if(!listData ){
            selt.noResultList="无关注列表，快去增加关注信息把。";
        }else{
            if(length<1){
                selt.noResultList="已经到底了！"
            }
        }
    };

    this.loading = function (){
        selt.info="正在加载中..."
        selt.noResultList=null;
    }

    //查询收藏公告
    this.queryCollNoticeList = function (type) {
        this.loading();
        this.clearData(type);
        selt.busy = true;
        this.param.type=type;
        console.log(this.param);
        $http.post("/userCenter/listCollectionNotice", angular.toJson(this.param)).success(function (result) {
            console.log("##result.pageNum："+result.pageNum);
            console.log(result);
            selt.resultLength=result.data.length;
            selt.returnPageNum=result.pageNum;
            if(selt.returnPageNum!=selt.param.pageNo){//翻页时当前页没有记录，后端也会返回上一页记录。防止继续翻页
                selt.resultLength=-1;
                if (selt.param.type == 0) {
                    selt.showTailInfo(selt.tenderList, selt.resultLength);
                } else if (selt.param.type == 2) {
                    selt.showTailInfo(selt.biddingList, selt.resultLength);
                }
            }else {
                if (selt.param.type == 0) {
                    if (selt.tenderList) {
                        selt.tenderList = selt.tenderList.concat(result.data);
                    } else {
                        selt.tenderList = result.data;
                    }
                    selt.showTailInfo(selt.tenderList, result.data.length);
                } else if (selt.param.type == 2) {
                    if (selt.biddingList) {
                        selt.biddingList = selt.biddingList.concat(result.data);
                    } else {
                        selt.biddingList = result.data;
                    }
                    selt.showTailInfo(selt.biddingList, result.data.length);
                }
            }
            selt.turnPageFinished();
        });
    };


    //查询收藏企业
    this.queryCollComList = function () {
        this.loading();
        this.clearData();
        selt.busy = true;
        this.choiceCompanyList=true;
        console.log(this.param);
        $http.post("/userCenter/listCollectionCompany", angular.toJson(this.param)).success(function (result) {
            console.log("##result.pageNum："+result.pageNum);
            console.log(result);

            selt.resultLength = result.data.length;
            selt.returnPageNum =result.pageNum;
            if (selt.companyList) {
                selt.companyList = selt.companyList.concat(result.data);
            } else {
                selt.companyList = result.data;
            }
            selt.turnPageFinished();
        });
    };



    this.cancelCollectionNotice = function (noticeid,type){
        var cancelParam = {noticeid:noticeid};
        $http.post("/userCenter/cancelCollectionNotice", angular.toJson(cancelParam)).success(function (result) {
            console.log(result);
            if(result.code==1){//取消成功
                alert("取消关注成功");
                selt.clearAllList();
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
                alert("取消关注成功");
                selt.clearAllList();
                selt.queryCollComList();
            }else{
                alert(result.msg);
            }
        });
    };

    this.nextPage =function (){
        console.log('selt.returnPageNum:'+selt.returnPageNum);
        if (selt.busy || selt.resultLength<=0) return;
        selt.busy = true;

        console.log('selt.param.pageNo:'+selt.param.pageNo+"##selt.returnPageNum:"+selt.returnPageNum);
        if (selt.param.pageNo == selt.returnPageNum) {
            selt.param.pageNo += 1;
            if (this.param.type) {
                selt.queryCollNoticeList(this.param.type);
            } else {
                selt.queryCollComList();
            }
            this.turnPageFinished();
        }
    };

    this.turnPageFinished = function (){
        selt.busy = false;
        selt.info=null;
    };

    //页面初始化
    this.queryCollNoticeList('0');


}]);