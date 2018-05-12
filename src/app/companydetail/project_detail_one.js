app.controller('ProjectDetailOneCtrl', ['$http', 'userTemp','utils','$state',function($http,userTemp,utils,$state) {
    var self = this;
    if (userTemp != null) {
        self.user = angular.fromJson(userTemp);
    } else {
        self.user = null;
    }

    this.proId = $state.params.proId;

    var refresh = utils.getUrlVar('refresh');
    if(refresh == 'true') {
        window.location.href = 'index.html#/projectDetail/'+self.proId+'/bidding/'+self.proId;
        location.reload();
    }else {
        if(null == self.user){
            window.location.href = 'index.html#/login?service=projectDetail/'+self.proId+'/bidding/'+self.proId;
        }
    }

    var param = {
        id:$state.params.proId
    };


    $http.post("/project/detail",angular.toJson(param)).success(function (result) {
        if(result.code == 1){
            self.projectDetail = result.data;
            console.log(self.projectDetail);
        }
    });


    console.log( $state.current.name);
    this.menu = $state.current.name;
    this.selectMenu = function (menu) {
        self.menu = menu;
    };

}]);