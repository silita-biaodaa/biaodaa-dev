app.controller('LoginCtrl', ['$http','$log','$scope','$document', 'username',function($http,$uibModal, $log, $scope,$document, username) {
	var selt = this;
	if(username != null && username != '') {
		selt.user = {
			username : username
		};
	} else {
		selt.user = null;
	}
	/**
	 * 登录
	 */
	this.login = function() {
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
				username = result.data.username;
				sessionStorage.setItem("X-TOKEN", result.data.xtoken);
				sessionStorage.setItem("username", result.data.username);
				window.location.href="index.html#/home";
			}
		});
	}
	this.logout = function() {
		sessionStorage.removeItem("X-TOKEN");
		sessionStorage.removeItem("username");
		username = "";
		selt.user = null;
		window.location.href="index.html#/home";
	};
}]);
