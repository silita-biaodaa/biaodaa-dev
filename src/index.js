app.controller('IndexCtrl', ['$http','$scope','userTemp','utils',function($http,$scope,userTemp,utils) {
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

    //select option改变触发的事件
    this.dateValue = "default"
    this.selectChange = function(dateValue){
        console.log("value : " + dateValue);
        if(dateValue=='default'){
            dateValue = 'personInfo';
        }
        window.location.href="index.html#/ucenter/"+dateValue;

    };


    this.goMenu = "tender?type=99&keyword=";
    this.goUrl = "index.html#/"+this.goMenu;
    this.selectGoMenu = function(goMenu){
        console.log("value : index.html#/" + goMenu);
        selt.goUrl = "index.html#/" + goMenu;
    };

    this.seachKeyword = function(){
        window.location.href=selt.goUrl+selt.keyword;
        window.location.reload();
    };



    console.log(utils.getShortUrl());
    this.menu = utils.getShortUrl();
    if(this.menu=='company'){
        selt.menu = 'companyTop';
    }
    if(this.menu=='person'){
        selt.menu = 'companyTop';
    }
    this.selectMenu = function (menu) {
        selt.menu = menu;
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
