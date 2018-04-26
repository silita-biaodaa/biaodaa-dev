app.controller('LoginCtrl', ['$http', '$log', '$scope', '$document', 'userTemp', function ($http, $uibModal, $log, $scope, $document, userTemp) {
    var selt = this;

    selt.mobileRegx = RegExp("^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$");
    selt.pwdRegx = "[a-zA-Z0-9]*";

    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }

    /**
     * 登录
     */
    this.login = function (valid) {
        var params = {
            version: "0",
            loginchannel: "1003",
            userphone: selt.userphone,
            userpass: selt.userpass
        };

        if (valid) {
            $http.post("/authorize/userLogin", angular.toJson(params)).success(function (result) {
                if (result.code == 0) {
                    alert(result.msg);
                } else {
                    var vo = angular.toJson({
                        "username": result.data.username,
                        "imgurl": result.data.imgurl
                    });
                    userTemp = vo;
                    sessionStorage.setItem("X-TOKEN", result.data.xtoken);
                    sessionStorage.setItem("userTemp", vo);
                    window.location.href = "index.html#/home";
                }
            });
        }
    }

    this.logout = function () {
        userTemp = null;
        selt.user = null;
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        window.location.href = "index.html#/home";
    };
}]);
