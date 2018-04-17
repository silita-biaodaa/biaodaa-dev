app.controller('CompanyDetailCtrl', ['$http','$scope','utils',function($http,$scope, utils) {
	var selt = this;

	var comId =  utils.getUrlVar('comId');
	console.log("=====comId:"+comId);

	var params = {};
	$http.post("/company/"+comId,angular.toJson(params)).success(function (result) {
		selt.company=result.data;
	});













}]);
