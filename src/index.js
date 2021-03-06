app.controller('IndexCtrl', ['$http','$scope','userTemp','utils', '$anchorScroll',"$location",'locals','$state',function($http,$scope,userTemp,utils, $anchorScroll,$location,locals,$state) {

    var selt = this;

    if (userTemp != null) {
        selt.user = angular.fromJson(userTemp);
        if(locals.get("imgUrl")){
            selt.user.imgurl = locals.get("imgUrl");
        }
    } else {
        selt.user = null;
    }

    this.logout = function () {
        sessionStorage.removeItem("X-TOKEN");
        sessionStorage.removeItem("userTemp");
        userTemp = null;
        selt.user = null;
        window.location.href = "index.html#/home?refresh=true";
    };

    //select option改变触发的事件
    this.dateValue = "default"
    $scope.hrefUrl = "ucenter.personInfo";
    this.selectChange = function(dateValue){
        console.log("value : " + dateValue);
        if(dateValue == 'logout') {
            this.logout();
        }
        if(dateValue=='default'){
            dateValue = 'personInfo';
        }
        window.location.href="index.html#/ucenter/"+dateValue;
        $scope.hrefUrl = 'ucenter.'+dateValue;
    };
    var keyword = utils.getUrlVar('keyword');
    if(keyword){
        selt.keyword = decodeURI(keyword);
    }

    this.goMenu = "tender?type=99&keyword=";
    this.showType = 0;
    this.goUrl = "index.html#/"+this.goMenu;
    $scope.searchName="搜标讯";
    this.placeholderName = "搜索招标、中标公告";
    this.showName = '招标';
    if(null != locals.get("selectName")){
        this.showName = locals.get("selectName");
    }
    this.selectGoMenu = function(goMenu,searchName,placeholderName){
        $scope.searchName=searchName;
        selt.placeholderName = placeholderName;
        this.showName = searchName;
        locals.set("selectName",searchName);
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
    $("#divD").css('left','350px');
    $("#btnFadein").click(function(){
        if(isShow){
            $("#divD").animate({left:'350px'}).fadeOut("fast",function(){
                $("#divD").css("visibility","hidden");
            });

        }else{
            $("#divD").css("visibility","visible");
            $("#divD").animate({left:'350px'}).fadeIn("fast");
            //$("#divD").css('left','500px');
            $("#divD").animate({left:'0px'}).fadeIn("fast",function(){

            });
        }
        isShow = !isShow;

    });
    selt.showCode = false;
    $scope.showImageCode=function(){
        selt.showCode = true;
    }
    $scope.hideImageCode=function(){
        selt.showCode = false;
    }
    selt.showHeadImage = false;
    $scope.showImageIcon=function(showHeadImage){
        selt.showHeadImage = !showHeadImage;
    }
    selt.showTender = false;
    $scope.showTenderList=function(showTender){
        selt.showTender = !showTender;
    }
    $scope.toTop=function(){
        $location.hash();
        $anchorScroll();
    }
    if(locals.get('showVisionCode',0)==0){
        $scope.isShowNewVision=true;
    }else{
        $scope.isShowNewVision=false;
    }
    $scope.showNewVision=function(){
        $scope.isShowNewVision=false;
        locals.set('showVisionCode',1);
    }
}]);
