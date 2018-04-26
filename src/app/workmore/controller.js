app.controller('WorkMoreCtrl', ['$http','$uibModal','$log','$scope','$state','locals','userTemp',function($http,$uibModal, $log, $scope,$state,locals,userTemp) {

    var selt = this;

    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }


    this.type = '0';
    this.dataArray = [];
    this.busy = false;
    this.page = 1;

    this.nextPage = function () {
        if (selt.busy) return;
        selt.busy = true;
        var params = {
            pageNo:selt.page,
            pageSize:20,
            time:'',
            title:'',
            type:selt.type
        };

        $http.post("/notice/queryArticleList",angular.toJson(params)).success(function (result) {
            var dataArray = result.data;
            if(dataArray!=null&&selt.page==result.pageNum){
                angular.forEach(dataArray,function(item){
                    selt.dataArray.push(item);
                });
                selt.busy = false;
                selt.page += 1;
            }


        });
    };

    this.isCompany = true;

    this.toDiffMsg = function(type){
        selt.type=type;
        if(type=='0'){
            selt.isCompany = true;
        }else{
            selt.isCompany = false;
        }
        selt.dataArray = [];
        selt.busy = false;
        selt.page = 1;
        selt.nextPage();
    }
    this.toDetail = function(id){
        $state.go('workmoreDetail',{id:id});

    }
    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };
}]);



app.controller('WorkMoreDetailCtrl', ['$http','$uibModal','$log','$scope','$state','$stateParams','userTemp',function($http,$uibModal, $log, $scope,$state,$stateParams,userTemp) {
    var selt = this;

    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }

    var id = parseInt($stateParams.id);
    $http.post("/notice/queryArticleDetail",{id:id}).success(function (result) {
        console.log(result);
        $scope.dataRes = result.data;
        $("#bdd_adver_header_content").html(result.data.content);
    });
    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };

}]);