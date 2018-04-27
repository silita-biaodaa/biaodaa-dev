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
    var left = $("#btnFadein").offset().left;
    var top = $("#btnFadein").offset().top;
    $("#divD").css('left',left);
    $("#divD").css('top',top);
    console.log(left+':'+top);
    $("#divD").css('margin-top','40px');
    $("#btnFadein").click(function(){
        if(isShow){
            $("#divD").animate({left:(left)+'px'}).fadeOut("fast",function(){
                $("#divD").css("visibility","hidden");
            });

        }else{
            $("#divD").css("visibility","visible");
            $("#divD").animate({left:(left)+'px'}).fadeIn("fast");
            //$("#divD").css('left','500px');
            $("#divD").animate({left:left-180}).fadeIn("fast");
        }
        isShow = !isShow;

    });







}]);
