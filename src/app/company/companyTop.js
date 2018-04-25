app.controller('CompanyTopCtrl', ['$http','$uibModal','$log','$scope','$document', 'username',function($http,$uibModal, $log, $scope,$document,username) {
    var selt = this;
    if(username != null && username != '') {
        selt.user = {
            username : username
        };
    } else {
        selt.user = null;
    }



    this.companyList = function () {
        var paramsPage = {
            pageNo:1,
            pageSize:5
        };
        $http.post("/company/query/filter", angular.toJson(paramsPage)).success(function (result) {
            selt.companyList = result.data;
        });
    };

    this.personList = function () {
        var paramsPage = {
            pageNo:1,
            pageSize:5
        };
        $http.post("/company/person", angular.toJson(paramsPage)).success(function (result) {
            selt.personList = result.data;
        });
    };


    this.logout = function() {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("username");
        username = "";
        selt.user = null;
        window.location.href="index.html#/home";
    };
}]);