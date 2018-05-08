/*
* 1、浏览器中输入地址
* 2、路由拦截输入的地址（锚点后的字符串）
* 3、每个state会去匹配该字符串 如果匹配则进入templateUrl的地址所指示的html页面
* 4、如果都没有匹配的，则进入最后一行otherwise的地址
*
* */
var app = angular.module('WEBAPP', [
    'ui.router',
    'ui.bootstrap',
    'ngTouch',
    'oc.lazyLoad',
    'app.utils',
    'infinite-scroll'
]);


app.run(['$rootScope', '$log', function($rootScope, $log){
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
        var titleName = toState.name.toLowerCase();
        $rootScope.title = toState.title;//在相关的路由中添加title
        var titleArr = angular.element(document.querySelectorAll('.bdd-nav-app-title'));
        for(var i=0;i<titleArr.length;i++){
            titleArr[i].className="bdd-nav-app-title";
            titleArr[i].style.color = "#ffffff";
        }
            if(titleName.indexOf("home")!=-1){
                titleArr[0].className="bdd-nav-app-title home_title_active";
                titleArr[0].style.color = "#cea63f";
            }else if(titleName.indexOf("tender")!=-1){
            titleArr[1].className="bdd-nav-app-title home_title_active";
                titleArr[1].style.color = "#cea63f";
        }else  if(titleName.indexOf("company")!=-1){
            titleArr[2].className="bdd-nav-app-title home_title_active";
                titleArr[2].style.color = "#cea63f";
        }else if(titleName.indexOf("workmore")!=-1){
            titleArr[3].className="bdd-nav-app-title home_title_active";
                titleArr[3].style.color = "#cea63f";
        }else if(titleName.indexOf("usercenter")!=-1){
            titleArr[4].className="bdd-nav-app-title home_title_active";
                titleArr[4].style.color = "#cea63f";
        }
    });
}]);


app.factory('locals',['$window',function($window){
    return {
        set:function(key,value){
            $window.localStorage[key]=value;
        },
        get:function(key,defaultValue){
            return  $window.localStorage[key] || defaultValue;
        },
        setObject:function(key,value){
            $window.localStorage[key]=JSON.stringify(value);
        },
        getObject:function(key){
            return JSON.parse( $window.localStorage[key] || '{}');
        }
    }
}]);

app.directive('ngEnter', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function ($scope, element, attrs, controller) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    $scope.$apply(function (){
                        $scope.$eval(attrs.ngEnter);
                    });
                    event.preventDefault();
                }
            });
        }}});

app.filter('areaLimit',function () {
    return function (name) {
        if('黑龙江省'==name){
            return '黑龙江';
        }else{
            return name.substring(0,2);
        }
    }
});

function logout(){
    sessionStorage.removeItem("X-TOKEN");
    sessionStorage.removeItem("username");
    window.location.href="index.html#/home";
}



$(function () {
    var r = document.body.offsetWidth / 1920; //window.screen.availWidth;
    if (window.screen.availWidth < 1920) {
        $(document.body).css("zoom", r);
    }
});


