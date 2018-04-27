app.controller('IndexCtrl', ['$http','$scope','userTemp',function($http,$scope,userTemp) {
    var selt = this;

    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
    } else {
        selt.user = null;
    };
    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home";
    };

    var isShow = false;

    $("#btnFadein").click(function(){
        if(isShow){
            $("#divD").animate({left:'220px'}).fadeOut("fast",function(){
                $("#divD").css("visibility","hidden");
            });

        }else{
            $("#divD").css("visibility","visible");
            $("#divD").animate({left:'220px'}).fadeIn("fast");
            //$("#divD").css('left','500px');
            $("#divD").animate({left:'0px'}).fadeIn("fast",function(){

            });
        }
        isShow = !isShow;

    });







}]);
