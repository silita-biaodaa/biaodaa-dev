app.controller('PermissionCtrl', ['$http', 'userTemp','utils','$state',function($http,userTemp,utils,$state) {
    var self = this;
    if (userTemp != null) {
        self.user = angular.fromJson(userTemp);
    } else {
        self.user = null;
    }
    this.proId = $state.params.proId;

}]);