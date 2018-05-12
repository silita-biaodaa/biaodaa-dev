app.controller('CompanyTopCtrl', ['$http','$uibModal','$log','$scope','$document', 'userTemp',function($http,$uibModal, $log, $scope,$document,userTemp) {
    var selt = this;
    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }

    var paramsPage = {
        pageNo:1,
        pageSize:4,
    };
    $http.post("/company/query/filter", angular.toJson(paramsPage)).success(function (result) {
        selt.companyList = result.data;
    });



    $http.post("/company/person", angular.toJson(paramsPage)).success(function (result) {
        selt.personList = result.data;
    });


    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };

    var paramsPage = {
        proName:self.keyword == "" ? null : self.keyword,
        area:self.regisAddress == "" ? null : self.regisAddress,
        pageNo:0,
        proType:self.proType,
        pageSize:6,
        tabType:"project"
    };

    $http.post("/project/query", angular.toJson(paramsPage)).success(function (result) {
        var projectList = result.data;
        selt.projectList=projectList;
        selt.totalCount = result.total;
        selt.pageSize = result.pageSize;
        selt.pageNo = result.pageNum;
        selt.busy = false;
        selt.page += 1;

    });


    this.setPage = function () {
        self.projectList = [];
        self.busy = false;
        self.page = 1;
        self.nextPage();
    };

    this.nextPage = function () {
        if (self.busy) return;
        self.busy = true;
        var paramsPage = {
            proName:self.keyword == "" ? null : self.keyword,
            area:self.regisAddress == "" ? null : self.regisAddress,
            pageNo:self.page,
            proType:self.proType,
            pageSize:6,
            tabType:"project"
        };

        $http.post("/project/query", angular.toJson(paramsPage)).success(function (result) {
            var projectList = result.data;
            if(projectList!=null&&projectList.length>0){
                if(self.page==result.pageNum){
                    angular.forEach(projectList,function(project){
                        self.projectList.push(project);
                    });
                    self.totalCount = result.total;
                    self.pageSize = result.pageSize;;
                    self.pageNo = result.pageNum;
                    self.busy = false;
                    self.page += 1;

                }
            }else{
                self.totalCount = 0;
            }
        });
    };
}]);