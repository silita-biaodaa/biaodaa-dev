app.controller('HomeCtrl', ['$http','$uibModal','$log','$scope','$document', 'username',function($http,$uibModal, $log, $scope, $document, username) {
	var selt = this;
	var paramsPage = {
		type:2,
		pageNo:1,
		pageSize:5
	};

	$http.post("/notice/queryList",angular.toJson(paramsPage)).success(function (result) {
		console.log(result);
		selt.testList = result.data;
	});

	this.setPage = function () {
		var paramsPage = {
			type:selt.type,
			projectType:selt.projectType,
			pageNo:1,
			pageSize:5
		};

		$http.post("/notice/queryList",angular.toJson(paramsPage)).success(function (result) {
			console.log(result);
			selt.testList = result.data;
		});
	};

	this.choiceType = function (type,projectType) {
		selt.type=type;
		selt.projectType = projectType;
		selt.setPage()
	}


	if(username != null && username != '') {
		selt.user = {
			username : username
		};
	} else {
		selt.user = null;
	}

	$http.post("/foundation/listBannerImage",{type:1,showType:1}).success(function (result) {
		console.log(result);
	});

	this.logout = function() {
		sessionStorage.removeItem("X-TOKEN");
		sessionStorage.removeItem("username");
		username = "";
		selt.user = null;
		window.location.href="index.html#/home";
    };

}]);
