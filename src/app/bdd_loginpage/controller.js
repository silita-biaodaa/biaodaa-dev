app.controller('LoginCtrl', ['$http','$log','$scope','$document',function($http,$uibModal, $log, $scope,$document) {
	var selt = this;

	this.submit = function() {
		var params = {
			version:"0",
			loginchannel:"1003",
			username:selt.username,
			userpass:selt.userpass
		};
		//console.log(params);

		$http.post("/authorize/userLogin",angular.toJson(params)).success(function(result)
		{
			if (result.code == 0) {
				alert(result.msg);
			}else{
				sessionStorage.setItem("X-TOKEN", result.data.xtoken);
				window.location.href="/index.html#/home";
			}
		});
	}

}]);
