app.controller('PersonInfoCtrl', ['$http','$uibModal','$log','$scope','$document',function($http,$uibModal, $log, $scope,$document) {
    var selt = this;
    $scope.visible = false;
    $scope.name_hide = true;
    $scope.email_visible = false;
    $scope.email_hide = true;
    $scope.toggle = function () {
        $scope.visible = !$scope.visible;
        $scope.name_hide = !$scope.name_hide;
    }

    $scope.toggle_email  = function () {
        $scope.email_visible = !$scope.email_visible;
        $scope.email_hide = !$scope.email_hide;
    }
    this.userDetail = function () {
        // $http.post("/jdeji/jjja").success(function (result) {
        //         //
        //         // });
        selt.user = {};
        selt.user.username = "李四";
        selt.user.phone = "15616223362";
    }

    this.submit = function () {
        var username = document.getElementById("user_name").value;
        var userEmail = document.getElementById("user_email").value;
        var params = {
            nickname:username,
            mailbox:userEmail
        };

        $http.post("/userCenter/updateUserTemp",angular.toJson(params)).success(function (result) {
            
        });
    }

}]);