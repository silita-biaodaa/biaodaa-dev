app.controller('WorkMoreCtrl', ['$http','$uibModal','$log','$scope','$state','locals','userTemp',function($http,$uibModal, $log, $scope,$state,locals,userTemp) {

    var selt = this;

    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }
    $scope.isCompany = true;
        var params = {
            pageNo:1,
            pageSize:20,
            time:'',
            title:'',
            type:'0'
        }

        $http.post("/notice/queryArticleList",params).success(function (result) {
                console.log(result);
                $scope.dataArray = result.data;
            });
        $scope.toDiffMsg = function(type){
            params.type=type;
            if(type=='0'){
                $scope.isCompany = true;
            }else{
                $scope.isCompany = false;
            }
            $http.post("/notice/queryArticleList",params).success(function (result) {
                console.log(result);
                $scope.dataArray = result.data;
            });
        }
        $scope.toDetail = function(id){
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