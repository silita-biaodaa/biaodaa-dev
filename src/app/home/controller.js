(function() {
	angular
				.module('HomeController',['ui.bootstrap','ngTouch'])
				.controller('HomeCtrl', ['$http','$uibModal','$log','$scope','$document',function($http,$uibModal, $log, $scope,$document) {
                    $http.post("/foundation/listBannerImage",{type:1,showType:1}).success(function (result) {
                        console.log(result);
                    });

				}]);



})();
