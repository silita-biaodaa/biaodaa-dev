(function() {
	var app =
		angular
		.module('WEBAPP', [
			'ui.router',
			'WEBAPP.INDEX.CONTROLLER',
			'WEBAPP.ABOUT.CONTROLLER'
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
				templateUrl: window.rootSrc + 'app/index/index.tpl.html',

				// 在controller 定义的时候用 this.xxx 的方式定义属性或者方法，模版中使用的时候 使用 $ctrl 来代替 this，详情请看index.tpl.html内容
				controller: 'IndexCtrl as $ctrl'
			})

			.state('About', {
				url: '/about/:id',
				templateUrl: window.rootSrc + 'app/about/index.tpl.html',

				// 在controller 定义的时候用 this.xxx 的方式定义属性或者方法，模版中使用的时候 使用 $ctrl 来代替 this，详情请看index.tpl.html内容
				controller: 'AboutCtrl as $ctrl'
			});

		/**
		 * 什么都匹配不到的时候就跳转到首页
		 */
		$urlRouterProvider.otherwise('/index');
	}
})();





