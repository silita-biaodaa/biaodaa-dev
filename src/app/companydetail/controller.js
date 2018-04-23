app.controller('CompanyDetailCtrl', ['$http','$scope','utils','username',function($http,$scope, utils,username) {
	var selt = this;
	if(username != null && username != '') {
		selt.user = {
			username : username
		};
	} else {
		selt.user = null;
	}

	var comId =  utils.getUrlVar('comId');
	console.log("=====comId:"+comId);

	var params = {};
	$http.post("/company/"+comId,angular.toJson(params)).success(function (result) {
		selt.company=result.data;
	});

	this.showType = 1;
	selt.showTip = 1;
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
		if( result.data!=null&& result.data.reputation!=null){
			var len = result.data.reputation.length;
			if(len!=null && len>0){
				selt.showTip = 0;
			}
		}
	});

	//undesirable
	$http.post("/company/undesirable/"+comId,angular.toJson(params)).success(function (result) {
		selt.undesMap=result.data;
	});
	$http.post("/company/qual/5").success(function (result) {
		console.log(result);
	});

	this.showReputation = function (reputList) {
		selt.reputList = reputList;
		if(reputList!=null&&reputList.length>0){
			selt.showTip = 0;
		}


	};

	this.showUndesirable = function (undesList) {
		selt.undesList = undesList;

	}
	this.changeOneMore = function (event) {
		var elem = event.target;

		var siblingElem = elem.parentNode.parentNode.nextSibling.nextSibling;
		if(elem.innerText=='收起'){
			elem.innerText='更多';
			siblingElem.style.display="none";
		}else{
			elem.innerText='收起';
			siblingElem.style.display="block";
		}

	}
	this.logout = function() {
		sessionStorage.removeItem("X-TOKEN");
		sessionStorage.removeItem("username");
		username = "";
		selt.user = null;
		window.location.href="index.html#/home";
	};
}]);
