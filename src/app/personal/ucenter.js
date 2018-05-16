app.controller('UcenterCtrl', ['$http','$state','$log','$scope','$document', 'userTemp',function($http,$state, $log, $scope,$document,userTemp) {
    var selt = this;
    
    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
        window.location.href="index.html#/login";
    }


    $http.post("/userCenter/getUserTemp",null).success(function (result) {
        $scope.ucenter = result.data;
    });

    console.log( $state.current.name);
    this.menu = $state.current.name;
    if($scope.hrefUrl == 'ucenter.personInfo'){
        window.location.href="index.html#/ucenter/personInfo";
    }else if($scope.hrefUrl == 'ucenter.financial'){
        window.location.href="index.html#/ucenter/financial";
    }else if($scope.hrefUrl == 'ucenter.messages'){
        window.location.href="index.html#/ucenter/messages";
    }else if($scope.hrefUrl == 'ucenter.feedback'){
        window.location.href="index.html#/ucenter/feedback";
    }else if($scope.hrefUrl == 'ucenter.myfollow'){
        window.location.href="index.html#/ucenter/myfollow";
    }
    this.selectMenu = function (menu) {
        selt.menu = menu;
        $scope.hrefUrl = menu;
    };






    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };
}]);