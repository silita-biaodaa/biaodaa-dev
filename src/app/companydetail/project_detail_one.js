app.controller('ProjectDetailOneCtrl', ['$http', 'userTemp','utils','$state',function($http,userTemp,utils,$state) {
    var self = this;
    if (userTemp != null) {
        self.user = angular.fromJson(userTemp);
    } else {
        self.user = null;
    }

    this.tst="112233";


    this.proId = $state.params.proId;

    var param = {
        id:$state.params.proId
    };


    $http.post("/project/detail",angular.toJson(param)).success(function (result) {
        if(result.code == 1){
            self.projectDetail = result.data;
            console.log(self.projectDetail);
        }else{
            alert('获取详细信息失败');
        }
    });


    console.log( $state.current.name);
    this.menu = $state.current.name;
    this.selectMenu = function (menu) {
        self.menu = menu;
    };



}]);