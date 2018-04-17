app.controller('CompanyDetailCtrl', ['$http','$scope','utils',function($http,$scope, utils) {
	var selt = this;

	var comId =  utils.getUrlVar('comId');
	console.log("=====comId:"+comId);

	var params = {};
	$http.post("/company/"+comId,angular.toJson(params)).success(function (result) {
		selt.company=result.data;
	});

	this.showType = 1;
	var style00 = {
		"background-color":"#4d3a3a",
		"color": "white"
	};
	this.style01 = style00;


	this.changeType = function (type) {
		selt.showType = type;
		selt.style01 = "";
		selt.style02 = "";
		selt.style03 = "";
		selt.style04 = "";
		if(type==1){
			selt.style01 = style00;
		}else if(type==2){
			selt.style02 = style00;
		}else if(type==3){
			selt.style03 = style00;
		}else if(type==4){
			selt.style04 = style00;
		}
	};


	//reputation
	$http.post("/company/reputation/"+comId,angular.toJson(params)).success(function (result) {
		selt.repuMap=result.data;
	});

	//undesirable
	$http.post("/company/undesirable/"+comId,angular.toJson(params)).success(function (result) {
		selt.undesMap=result.data;
	});

	this.showReputation = function (reputList) {
		selt.reputList = reputList;

	};

	this.showUndesirable = function (undesList) {
		selt.undesList = undesList;

	}













}]);
