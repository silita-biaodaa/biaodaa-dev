/*
* 1、浏览器中输入地址
* 2、路由拦截输入的地址（锚点后的字符串）
* 3、每个state会去匹配该字符串 如果匹配则进入templateUrl的地址所指示的html页面
* 4、如果都没有匹配的，则进入最后一行otherwise的地址
*
* */

(function() {
	var app =
		angular
		.module('WEBAPP', [
			'ui.router',
			'WEBAPP.INDEX.CONTROLLER',
			'WEBAPP.ABOUT.CONTROLLER',
            'WEBAPP.COM.CONTROLLER',
				'HomeController',
				'QiyeController',
				'TrendController',
				'TenderController',
				'CompanyDetailController',
				'SocietyController',
				'ngTouch',
				'ReputController'

		])
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider', '$compileProvider', '$httpProvider'];
	function config($stateProvider, $urlRouterProvider, $compileProvider, $httpProvider) {
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

		$httpProvider.defaults.headers.common = { 'X-TOKEN' : 'zxh0000001234' };

		/**
		 * 定义路由
		 */
		$stateProvider
			.state('Index', {
				url: '/index',
				templateUrl: window.rootSrc + 'app/index/index.tpl.html',//路由更改

				// 在controller 定义的时候用 this.xxx 的方式定义属性或者方法，模版中使用的时候 使用 $ctrl 来代替 this，详情请看index.tpl.html内容
				controller: 'IndexCtrl as $ctrl'
			})

			.state('About', {
				url: '/about/:id',
				templateUrl: window.rootSrc + 'app/about/index.tpl.html',

				// 在controller 定义的时候用 this.xxx 的方式定义属性或者方法，模版中使用的时候 使用 $ctrl 来代替 this，详情请看index.tpl.html内容
				controller: 'AboutCtrl as $ctrl'
			})

            .state('Company', {
                url: '/company',
                templateUrl: window.rootSrc + 'app/company/index.tpl.html',

                // 在controller 定义的时候用 this.xxx 的方式定义属性或者方法，模版中使用的时候 使用 $ctrl 来代替 this，详情请看index.tpl.html内容
                controller: 'CompanyCtrl as $ctrl'
            })
            .state('home', {
                url: '/home',
                templateUrl: window.rootSrc + 'app/home/index.tpl.html',
                controller: 'HomeCtrl as $ctrl'
            })
			.state('zhaobiao', {
            url: '/zhaobiao',
            templateUrl: window.rootSrc + 'app/tender/index.tpl.html',
            controller: 'tenderCtrl as $ctrl'
        })
			.state('trend', {
            url: '/trend',
            templateUrl: window.rootSrc + 'app/trendstatu/index.tpl.html',
            controller: 'trendCtrl as $ctrl'
        }).state('companyDetail', {
				url: '/companydetail',
				templateUrl: window.rootSrc + 'app/companydetail/index.tpl.html',
				controller: 'CompanyDetailCtrl as $ctrl'
			})
            .state('qiyemsg', {
                url: '/qiyemsg',
                templateUrl: window.rootSrc + 'app/qiyemsg/index.tpl.html',
                controller: 'qiyemsgCtrl as $ctrl'
            }).state('society', {
				url: '/society',
				templateUrl: window.rootSrc + 'app/society/index.tpl.html',
				controller: 'SocietyCtrl as $ctrl'
			}).state('Reput', {
				url: '/reput',
				templateUrl: window.rootSrc + 'app/reput/index.tpl.html',
				controller: 'ReputCtrl as $ctrl'
			}).state('Loginpage', {
            url: '/loginpage',
            templateUrl: window.rootSrc + 'app/loginpage/index.tpl.html',
            controller: 'LoginpageCtrl as $ctrl'
        }).state('Information', {
            url: '/information',
            templateUrl: window.rootSrc + 'app/information/index.tpl.html',
            controller: 'InformationCtrl as $ctrl'
        }).state('Basicinfor', {
            url: '/basicinfor',
            templateUrl: window.rootSrc + 'app/basicinfor/index.tpl.html',
            controller: 'BasicinforCtrl as $ctrl'
        }).state('Personnel', {
            url: '/personnel',
            templateUrl: window.rootSrc + 'app/personnel/index.tpl.html',
            controller: 'PersonnelCtrl as $ctrl'
        });

		/**
		 * 什么都匹配不到的时候就跳转到首页
		 */
		$urlRouterProvider.otherwise('/index');
	}
})();





