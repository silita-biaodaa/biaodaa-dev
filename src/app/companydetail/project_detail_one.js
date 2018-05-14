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

    this.biddingShowStyle = false;
    this.censorShowStyle = false;
    this.contractShowStyle = false;
    this.completeShowStyle = false;
    this.permissionShowStyle = false;
    console.log( $state.current.name);
    this.menu = $state.current.name;
    if(self.menu == 'projectDetail.bidding'){
        self.biddingShowStyle = true;
    }else if(self.menu == 'projectDetail.censor'){
        self.censorShowStyle = true;
    }else if(self.menu == 'projectDetail.contract'){
        self.contractShowStyle = true;
    }else if(self.menu == 'projectDetail.permission'){
        self.completeShowStyle = true;
    }else if(self.menu == 'projectDetail.complete'){
        self.permissionShowStyle = true;
    }
    this.selectMenu = function (menu) {
        self.menu = menu;
        if(self.menu == 'projectDetail.bidding'){
            self.censorShowStyle = false;
            self.contractShowStyle = false;
            self.completeShowStyle = false;
            self.permissionShowStyle = false;
        }else if(self.menu == 'projectDetail.censor'){
            self.biddingShowStyle = false;
            self.contractShowStyle = false;
            self.completeShowStyle = false;
            self.permissionShowStyle = false;
        }else if(self.menu == 'projectDetail.contract'){
            self.biddingShowStyle = false;
            self.censorShowStyle = false;
            self.completeShowStyle = false;
            self.permissionShowStyle = false;
        }else if(self.menu == 'projectDetail.permission'){
            self.biddingShowStyle = false;
            self.censorShowStyle = false;
            self.contractShowStyle = false;
            self.completeShowStyle = false;
        }else if(self.menu == 'projectDetail.complete'){
            self.biddingShowStyle = false;
            self.censorShowStyle = false;
            self.contractShowStyle = false;
            self.permissionShowStyle = false;
        }
    };

}]);