app.controller('WXLoginCtrl', ['$http','$log','$scope','$document',function($http,$uibModal, $log, $scope,$document) {
	var selt = this;

	var obj = new WxLogin({
		id: "login_container",
		appid: "wxcfaea301018d9721",
		scope: "snsapi_login",
		redirect_uri: "http://biaodaa.com/weChatLogin",
		state: "wxLogin",
		style: "white"
	});

}]);
