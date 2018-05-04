app.config(["$provide", "$compileProvider", "$controllerProvider", "$filterProvider",
    function ($provide, $compileProvider, $controllerProvider, $filterProvider) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
    }]);

app.constant('userTemp', sessionStorage.getItem("userTemp"));

app.config(['$stateProvider', '$urlRouterProvider', '$compileProvider', '$httpProvider', config]);
function config($stateProvider, $urlRouterProvider, $compileProvider, $httpProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);

    // $httpProvider.defaults.headers.common = {'X-TOKEN': 'biaodaaTestToken'};
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

        .state('CompanyTop', {
            url: '/companyTop',
            templateUrl: window.rootSrc + 'app/company/companyTop.html',

            // 在controller 定义的时候用 this.xxx 的方式定义属性或者方法，模版中使用的时候 使用 $ctrl 来代替 this，详情请看index.tpl.html内容
            controller: 'CompanyTopCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/company/companyTop.js'
                    ]);
                }]
            }
        })


        .state('home', {
            url: '/home',
            templateUrl: window.rootSrc + 'app/home/bdd_home.html',

            // 在controller 定义的时候用 this.xxx 的方式定义属性或者方法，模版中使用的时候 使用 $ctrl 来代替 this，详情请看index.tpl.html内容
            controller: 'HomeCtrl as $ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/home/controller.js'
                    ]);
                }]
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
            templateUrl: window.rootSrc + 'app/tender/tender.html',
            params: {'id': null},
            controller: 'tenderIndex as $ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/tender/tender.js'
                    ]);
                }]
            }
        }).state('TenderSay', {
        url: '/tenderSay/:id/:type',
        templateUrl: window.rootSrc + 'app/tender/tenderSay.html',
        controller: 'TenderSayCtrl as ctrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/tender/controller.js'
                ]);
            }]
        }
    }).state('TenderDtail', {
        url: '/tenderDetail/:id',
        templateUrl: window.rootSrc + 'app/tender/index.tpl.html',
        controller: 'tenderDetailCtrl as ctrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/tender/controller.js'
                ]);
            }]
        }
    }).state('TendList', {
        url: '/TendList/:id',
        templateUrl: window.rootSrc + 'app/tender/tender_list.html',
        controller: 'TendListCtrl as ctrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/tender/controller.js'
                ]);
            }]
        }
    }).state('TendListDetail', {
        url: '/TendListDetail',
        templateUrl: window.rootSrc + 'app/tender/tender_list_detail.html',
        controller: 'TendListDetailCtrl as ctrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/tender/controller.js'
                ]);
            }]
        }
    }).state('WinBid', {
        url: '/win_bid',
        templateUrl: window.rootSrc + 'app/winbid/index.html',
        controller: 'WinBidCtrl as ctrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/winbid/controller.js'
                ]);
            }]
        }
    }).state('Winbding', {
        url: '/winbding/:id',
        templateUrl: window.rootSrc + 'app/tender/winbding.html',
        controller: 'WinbdingCtrl as ctrl',
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
            templateUrl: window.rootSrc + 'app/login/bdd_login.html',
            controller: 'LoginCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/login/controller.js'
                    ]);
                }]
            }
        })
        .state('Register', {
            url: '/register',
            templateUrl: window.rootSrc + 'app/register/bdd_register.html',
            controller: 'RegisterCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/register/controller.js'
                    ]);
                }]
            }
        })
        .state('Forget', {
            url: '/forget',
            templateUrl: window.rootSrc + 'app/forget/bdd_forget.html',
            controller: 'ForgetCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/forget/controller.js'
                    ]);
                }]
            }
        })
        .state('workmore', {
            url: '/workmore',
            templateUrl: window.rootSrc + 'app/workmore/index.tpl.html',
            controller: 'WorkMoreCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/workmore/controller.js'
                    ]);
                }]
            }
        }) .state('workmoreDetail', {
        url: '/workmoreDetail/:id',
        templateUrl: window.rootSrc + 'app/workmore/detail.html',
        controller: 'WorkMoreDetailCtrl as ctrl',
        resolve: {
            load: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    'app/workmore/controller.js'
                ]);
            }]
        }
    })

        .state('society', {
            url: '/society',
            templateUrl: window.rootSrc + 'app/society/index.tpl.html',
            controller: 'SocietyCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/society/controller.js'
                    ]);
                }]
            }
        })

        .state('ucenter', {
            url: '/ucenter',
            templateUrl: window.rootSrc + 'app/personal/ucenter.html',
            controller: 'UcenterCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/personal/ucenter.js'
                    ]);
                }]
            }
        })

        .state('ucenter.feedback', {
            url: '/feedback',
            templateUrl: window.rootSrc + 'app/personal/feedback.html',
            controller: 'FeedbackCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/personal/feedback.js'
                    ]);
                }]
            }
        })


        .state('ucenter.financial', {
            url: '/financial',
            templateUrl: window.rootSrc + 'app/personal/financial.html',
            controller: 'FinancialCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/personal/financial.js'
                    ]);
                }]
            }
        })

        .state('ucenter.myfollow', {
            url: '/myfollow',
            templateUrl: window.rootSrc + 'app/personal/myfollow.html',
            controller: 'MyfollowCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/personal/myfollow.js'
                    ]);
                }]
            }
        })

        .state('ucenter.personInfo', {
            url: '/personInfo',
            templateUrl: window.rootSrc + 'app/personal/personInfo.html',
            controller: 'PersonInfoCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/personal/personInfo.js'
                    ]);
                }]
            }
        })
        .state('ucenter.messages', {
            url: '/messages',
            templateUrl: window.rootSrc + 'app/personal/messages.html',
            controller: 'MessagesCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/personal/messages.js'
                    ]);
                }]
            }
        })

        .state('Modify', {
            url: '/modify',
            templateUrl: window.rootSrc + 'app/modify/modify.html',
            controller: 'ModifyCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/modify/controller.js'
                    ]);
                }]
            }
        })

        .state('Usercenter', {
            url: '/usercenter',
            templateUrl: window.rootSrc + 'app/usercenter/index.tpl.html',
            controller: 'userCenterCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/usercenter/controller.js'
                    ]);
                }]
            }
        })

        .state('person', {
            url: '/person',
            templateUrl: window.rootSrc + 'app/searchperson/use.html',
            controller: 'PersonCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/searchperson/person.js'
                    ]);
                }]
            }
        })

        .state('Joinus', {
            url: '/joinus',
            templateUrl: window.rootSrc + 'app/footer/Joinus.html',
            controller: 'FooterCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/footer/controller.js'
                    ]);
                }]
            }
        })

        .state('Perp', {
            url: '/perp',
            templateUrl: window.rootSrc + 'app/footer/prep.html',
            controller: 'FooterCtrl as ctrl',
            resolve: {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load([
                        'app/footer/controller.js'
                    ]);
                }]
            }
        })


    ;
    /**
     * 什么都匹配不到的时候就跳转到首页
     */
    $urlRouterProvider.otherwise('/home');
}