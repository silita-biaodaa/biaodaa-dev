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
	'app.utils'
]);





