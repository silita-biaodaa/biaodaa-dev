app.controller('LoginCtrl', ['$http', '$log', '$scope', '$document', 'userTemp', '$state', function ($http, $log, $scope, $document, userTemp, $state) {
    var selt = this;

    var temp = getCookie("userCookie");
    if (temp != null && temp != '') {
        temp = angular.fromJson(temp);
        selt.userphone = temp.userphone;
        selt.userpass = temp.userpass;
    }

    selt.mobileRegx = RegExp("^1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\\d{8}$");
    selt.pwdRegx = "[a-zA-Z0-9]{8,16}";
    var flag;

    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    }

    this.checked = function ($event) {
        flag = $event.target.checked;
        console.log(flag)
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
                    window.location.href = "index.html#/home?refresh=true";

                    if (flag) {
                        setCookie("userCookie", angular.toJson(params), 7);
                    }
                    // $state.go('home',{},{reload:true});
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

    function setCookie(name, value, timeout) {
        var d = new Date();
        d.setDate(d.getDate() + timeout);
        document.cookie = name + '=' + value + ';expires=' + d;
    }

    function getCookie(name) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //['abc','cba']
            if (arr2[0] == name) {
                return arr2[1];
                console.log(arr2[1]);
            }
        }
        return '';
    }

}]);