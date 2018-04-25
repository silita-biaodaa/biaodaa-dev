
app.controller('TenderCtrl', ['$http', '$uibModal', '$log', '$scope', '$state', 'Demo','userTemp',function ($http, $uibModal, $log, $scope, $state,Demo,userTemp) {

    var selt = this;

    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }
    $scope.demo = new Demo(0);
    var tenderType = 0;//Ĭ���б�
    var paramsPage = {
        pageNo: 1,
        pbModes: '',
        type: 0,
        kbDateStart: '',
        projSumStart: '',
        projSumEnd: '',
        pageSize: 20,
        kbDateEnd: '',
        regions: '',
        zzType: '',
        projectType: ''
    };

    $http.post("/notice/queryList", angular.toJson(paramsPage),
        {headers: {'X-TOKEN':  sessionStorage.getItem('X-TOKEN')}}).success(function (result) {

            $scope.dataList = result.data;

        });
    $scope.isTender = true;

    $scope.toDetail = function (id) {
        if(tenderType==0) {
            $state.go('TenderDtail', {id: id});
        }else{
            $state.go('Winbding', {id: id});
        }
    }


    $scope.chageToTender = function(){
        paramsPage.type=0;
        tenderType = 0;
        $scope.demo = new Demo(tenderType);
        $scope.isTender = true;
        $http.post("/notice/queryList", angular.toJson(paramsPage),
            {headers: {'X-TOKEN':  sessionStorage.getItem('X-TOKEN')}}).success(function (result) {

                $scope.dataList = result.data;

            });

    }

    $scope.chageToWinBid = function(){
        tenderType = 2;
        $scope.demo = new Demo(tenderType);
        paramsPage.type=2;

        $scope.isTender = false;
        $http.post("/notice/queryList", angular.toJson(paramsPage),
            {headers: {'X-TOKEN':  sessionStorage.getItem('X-TOKEN')}}).success(function (result) {

                $scope.dataList = result.data;

            });

    }
    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };

}]);




app.factory('Demo', function ($http) {
    var paramsPage = {
        pageNo: 1,
        pbModes: '',
        type: 0,
        kbDateStart: '',
        projSumStart: '',
        projSumEnd: '',
        pageSize: 20,
        kbDateEnd: '',
        regions: '',
        zzType: '',
        projectType: ''
    };
         var Demo = function (tenderType) {
                 this.dataList = [];
                 this.busy = false;
                 this.after = '';
                 this.page = 0;
                 this.tenderType = tenderType;
             };

         Demo.prototype.nextPage = function () {
                 if (this.busy) return;
                 this.busy = true;

             paramsPage.pageNo = this.page;
             paramsPage.type = this.tenderType;
             $http.post("/notice/queryList", angular.toJson(paramsPage),
                 {headers: {'X-TOKEN':  sessionStorage.getItem('X-TOKEN')}}).success(function (result) {
                     var dataList = result.data;
                     if(dataList!=null){
                     for (var i = 0; i < dataList.length; i++) {
                         this.dataList.push(dataList[i]);
                     }
                     this.after = "t3_" + this.dataList[this.dataList.length - 1].id;
                     this.busy = false;
                     this.page += 1;
                     }
                 }.bind(this));

             };

         return Demo;
     });


app.controller('tenderDetailCtrl', ['$http', '$scope', 'utils', '$stateParams', '$state','userTemp', function ($http, $scope, utils, $stateParams, $state,userTemp) {
    var selt = this;

    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }
    var id = $stateParams.id;
    var dataArray = [];
    var resArray = [];
    $scope.currentNum = 0;
    $scope.bdSize = 0;

    var paramsPage = {
        type: 0
    }
    $http.post("/notice/queryRelNotice/" + id, angular.toJson(paramsPage)).success(function (result) {
        //console.log(result);
        dataArray = result.data;
        $scope.tenderArrayData = dataArray;
        $scope.firstTender = dataArray[0];

    })
    $http.post("/notice/detail/" + id, angular.toJson(paramsPage), {
        headers: {'X-TOKEN':  sessionStorage.getItem('X-TOKEN')}
    }).success(function (result) {
        //console.log(result);

        $scope.projSum = result.projSum;
        $scope.mSize = result.data.length;
        $scope.dataArrayList = result.data;
        $scope.currentTender = result.data[0];
        $scope.bdSize = result.data.length;
        $scope.fileCount = result.fileCount;
        $scope.relNoticeCount = result.relNoticeCount;
        if(result.data.length>0){
            $scope.currentNum =1;
        }

        $("#bdd_follow_info_one").html(result.data[0].content);
        $("#bdd_follow_info_two").html(result.data[0].content);
        resArray = result.data;
    })
    $http.post("/notice/queryCompanyList/" + id, {
        headers: {'X-TOKEN':  sessionStorage.getItem('X-TOKEN')}
    }).success(function (result) {
        console.log(result);
        $scope.copanyResultArr = result.data;

    })
    $scope.toCurrentTender = function (index) {
        $scope.currentTender = resArray[index];
        $scope.relNoticeCount = resArray[index].relNoticeCount;
        $("#bdd_follow_info_one").html(resArray[index].content);
        $scope.currentNum =index+1;
    }
    $scope.toTenderSayList = function (id, type) {
        $state.go('TenderSay', {id: id, type: type});
    }
    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };

}]);


//�б깫����ļ�����ҳ��??
app.controller('TenderSayCtrl', ['$http', '$scope', 'utils', '$stateParams', 'username',function ($http, $scope, utils, $stateParams,username) {
    var selt = this;

    if(username != null && username != '') {
        selt.user = {
            username : username
        };
    } else {
        selt.user = null;
    }
    var id = $stateParams.id;
    var showType = $stateParams.type;
    $scope.showType = showType;
    var paramsPage = {
        type: 0
    }
    if (showType == 0) {
        paramsPage.type = 0;
        $http.post("/notice/queryRelNotice/" + id, angular.toJson(paramsPage)).success(function (result) {

            var dataArray = result.data;
            $scope.tenderArrayData = dataArray;
            $scope.firstTender = dataArray[0];
        })
    } else if(showType == 1){
        paramsPage.type = 0;
        $http.post("/notice/queryNoticeFile/" + id, angular.toJson(paramsPage)).success(function (result) {

            var fileDataArray = result.data;
            $scope.fileDataArr = fileDataArray;
            $scope.fileSize = fileDataArray.length;
        });
        }else if(showType == 2){
        paramsPage.type = 2;
        $http.post("/notice/queryRelNotice/" + id, angular.toJson(paramsPage)).success(function (result) {

            var dataArray = result.data;
            $scope.tenderArrayData = dataArray;
            $scope.firstTender = dataArray[0];
        })
        }else if(showType == 3){
        paramsPage.type = 2;
        $http.post("/notice/queryNoticeFile/" + id, angular.toJson(paramsPage)).success(function (result) {
            var fileDataArray = result.data;
            $scope.fileDataArr = fileDataArray;
            $scope.fileSize = fileDataArray.length;
        });
    }
    this.logout = function() {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("username");
        username = "";
        selt.user = null;
        window.location.href="index.html#/home";
    };
}])

//�б깫��ҳ��
app.controller('WinbdingCtrl', ['$http', '$scope', 'utils', '$stateParams','$state','username', function ($http, $scope, utils, $stateParams,$state,username) {
    var selt = this;

    if(username != null && username != '') {
        selt.user = {
            username : username
        };
    } else {
        selt.user = null;
    }

    var id = $stateParams.id;

    var dataArray = [];
    var resArray = [];
    $scope.currentNum = 0;
    $scope.bdSize = 0;
    var paramsPage = {
        type: 2
    }
    $http.post("/notice/queryRelNotice/" + id, angular.toJson(paramsPage)).success(function (result) {
        //console.log(result);
        dataArray = result.data;
        $scope.tenderArrayData = dataArray;
        $scope.firstTender = dataArray[0];

    })
    $http.post("/notice/detail/" + id, angular.toJson(paramsPage), {
        headers: {'X-TOKEN':  sessionStorage.getItem('X-TOKEN')}
    }).success(function (result) {
        //console.log(result);
        $scope.mSize = result.data.length;
        $scope.dataArrayList = result.data;
        $scope.currentTender = result.data[0];
        $scope.bdSize = result.data.length;
        $scope.fileCount = result.fileCount;
        $scope.relNoticeCount = result.data[0].relNoticeCount;
        if(result.data.length>0){
            $scope.currentNum =1;
        }
        $("#bdd_follow_info_one").html(result.data[0].content);

    })
    $http.post("/notice/queryCompanyList/" + id).success(function (result) {
        console.log(result);
        $scope.copanyResultArr = result.data;

    })
    $scope.toCurrentTender = function (index) {
        $scope.currentTender = resArray[index];
        $scope.relNoticeCount = resArray[index].relNoticeCount;
        $("#bdd_follow_info_one").html(resArray[index].content);
        $scope.currentNum =index+1;
    }
    $scope.toTenderSayList = function (id, type) {
        $state.go('TenderSay', {id: id, type: type});
    }
    this.logout = function() {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("username");
        username = "";
        selt.user = null;
        window.location.href="index.html#/home";
    };
}]);




