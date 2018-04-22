app.controller('HomeCtrl', ['$http','$uibModal','$log','$scope','$document', 'username',function($http,$uibModal, $log, $scope, $document, username) {
	var selt = this;


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
	}

}]);
