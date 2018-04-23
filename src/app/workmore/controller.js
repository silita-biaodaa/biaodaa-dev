app.controller('WorkMoreCtrl', ['$http','$uibModal','$log','$scope','$state','locals',function($http,$uibModal, $log, $scope,$state,locals) {
    $scope.isCompany = true;
    /*
     * 获取数据
     * */
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
            if(type=='0'){//0 表示行业动态 1表示平台资讯
                $scope.isCompany = true;
            }else{
                $scope.isCompany = false;
            }
            $http.post("/notice/queryArticleList",params).success(function (result) {
                console.log(result);
                $scope.dataArray = result.data;
            });
        }
        $scope.toDetail = function(content){
            locals.set('content',content);
            $state.go('workmoreDetail');

        }
}]);



app.controller('WorkMoreDetailCtrl', ['$http','$uibModal','$log','$scope','$state','locals',function($http,$uibModal, $log, $scope,$state,locals) {
    var content = locals.get('content');
    $("#bdd_adver_header_content").html(content);
}]);