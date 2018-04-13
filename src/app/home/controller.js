(function() {
	angular
		.module('WEBAPP.COM.CONTROLLER', ['ui.bootstrap'])
		.controller('homeCtrl', ['$http','$uibModal','$log','$document',function($http,$uibModal, $log, $document) {
			var selt = this;

			this.title = 'INDEX1111';
			this.content = 'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.';

			this.getTest = function (comId){
				var params = {};
				$http.post("/company/"+comId,angular.toJson(params)).success(function (result) {
					selt.company=result.data;
				});

			};

			this.setPage = function (pageNo) {
				var paramsPage = {
					keyWord:'湖南',
					pageNo:pageNo,
					pageSize:5
				};
				$http.post("/company/query",angular.toJson(paramsPage)).success(function (result) {
					selt.testList = result.data;
					selt.totalCount = result.total;
					selt.pageSize = result.pageSize;;
					selt.pageNo = result.pageNum;
				});
			};

			this.pageChanged = function() {
				var paramsPage = {
					keyWord:'湖南',
					pageNo:this.pageNo,
					pageSize:5
				};
				$log.log('Page changed to: ' + this.pageNo);
				$http.post("/company/query",angular.toJson(paramsPage)).success(function (result) {
					selt.testList = result.data;
					selt.totalCount = result.total;
					selt.pageSize = result.pageSize;;
					selt.pageNo = result.pageNum;
				});

			};

			this.maxSize = 3;
			this.setPage(1);





		}]);



})();
