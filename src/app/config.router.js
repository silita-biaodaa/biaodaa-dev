app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
    }]);


app.config(['$stateProvider', '$urlRouterProvider', '$compileProvider', '$httpProvider', config]);
function config($stateProvider, $urlRouterProvider, $compileProvider, $httpProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

    // $httpProvider.defaults.headers.common = {'X-TOKEN': 'zxh0000001234'};
    // $httpProvider.interceptors.push('loadingInterceptor');
    $httpProvider.defaults.headers.common = { 'X-TOKEN' : sessionStorage.getItem("X-TOKEN") }

    /**
     * 定义路由
     */
    $stateProvider
        .state('Index', {
            url: '/index',
            templateUrl: window.rootSrc + 'app/index/index.tpl.html',//路由更改
            controller: 'IndexCtrl as $ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/index/controller.js'
                    ]);
                }]
            }
        })

        .state('About', {
            url: '/about/:id',
            templateUrl: window.rootSrc + 'app/about/index.tpl.html',

            // 在controller 定义的时候用 this.xxx 的方式定义属性或者方法，模版中使用的时候 使用 $ctrl 来代替 this，详情请看index.tpl.html内容
            controller: 'AboutCtrl as $ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/about/controller.js'
                    ]);
                }]
            }
        })

        .state('Company', {
            url: '/company',
            templateUrl: window.rootSrc + 'app/company/index.tpl.html',

            // 在controller 定义的时候用 this.xxx 的方式定义属性或者方法，模版中使用的时候 使用 $ctrl 来代替 this，详情请看index.tpl.html内容
            controller: 'CompanyCtrl as $ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/company/controller.js'
                    ]);
                }]
            }
        })


        .state('Home', {
            url: '/home',
            templateUrl: window.rootSrc + 'app/home/index.tpl.html',

            // 在controller 定义的时候用 this.xxx 的方式定义属性或者方法，模版中使用的时候 使用 $ctrl 来代替 this，详情请看index.tpl.html内容
            controller: 'HomeCtrl as $ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/home/controller.js'
                    ]);
                }],
            }
        })

        .state('CompanyDetail', {
            url: '/companydetail',
            templateUrl: window.rootSrc + 'app/companydetail/index.tpl.html',
            controller: 'CompanyDetailCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/companydetail/controller.js'
                    ]);
                }]
            }
        })
        .state('Tender', {
            url: '/tender',
            templateUrl: window.rootSrc + 'app/tender/index.tpl.html',
            controller: 'TenderCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/tender/controller.js'
                    ]);
                }]
            }
        })
        .state('Login', {
            url: '/login',
            templateUrl: window.rootSrc + 'app/bdd_loginpage/bdd_login.html',
            controller: 'LoginCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/bdd_loginpage/controller.js'
                    ]);
                }]
            }
        })
    ;
    /*.state('home', {
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
     }).state('Staff', {
     url: '/staff',
     templateUrl: window.rootSrc + 'app/stall/index.tpl.html',
     controller: 'StaffCtrl as $ctrl'
     });*/

    /**
     * 什么都匹配不到的时候就跳转到首页
     */
    $urlRouterProvider.otherwise('/home');
}