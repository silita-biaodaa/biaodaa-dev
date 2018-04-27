app.controller('HomeCtrl', ['$http', '$uibModal', '$log', '$scope', '$document', 'userTemp', function ($http, $uibModal, $log, $scope, $document, userTemp) {
    var selt = this;

    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }

//公告文章列表
    this.queryArticleList = function (type) {
        var articleParam = {
            pageNo: 1,
            pageSize: 5,
            type: type
        };
        $http.post("/notice/queryArticleList", angular.toJson(articleParam)).success(function (result) {
            console.log(result);
            if (articleParam.type == 0) {
                selt.tradeList = result.data;
            } else if (articleParam.type == 1) {
                selt.platformList = result.data;
            }
        });
    }
    this.queryArticleList('0');
    this.queryArticleList('1');

    this.setPage = function () {
        var paramsPage = {
            type: selt.type,
            projectType: selt.projectType,
            pageNo: 1,
            pageSize: 5
        };

        $http.post("/notice/queryList", angular.toJson(paramsPage)).success(function (result) {
            console.log(result);
            if (paramsPage.type == 0) {
                selt.zhaobiaoList = result.data;
            } else if (paramsPage.type == 2) {
                selt.zhongbiaoList = result.data;
            }
        });
    };


    this.choiceType = function (type, projectType) {
        selt.type = type;
        selt.projectType = projectType;
        selt.setPage()
    }

    $http.post("/foundation/listBannerImage",{type:0,showType:3}).success(function (result) {
        selt.imageArr = result.data;
        console.log(result);
    });

    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };


//页面初始化请求
    this.choiceType(2, '');
    this.choiceType(0, '');


}]);
