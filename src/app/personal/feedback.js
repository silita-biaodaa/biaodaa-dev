app.controller('FeedbackCtrl', ['$http','$uibModal','$log','$scope','$document','userTemp',function($http,$uibModal, $log, $scope,$document, userTemp) {
    var selt = this;
    selt.type = '程序错误';
    this.problemType = function (type) {
        if (type == 1) {
            selt.type = '程序错误';
        } else if (type == 2) {
            selt.type = '产品建议';
        } else {
            selt.type = '吐槽';
        }
    }
    this.submit = function () {
        if (null != userTemp) {
            var username = angular.fromJson(userTemp).username;
            var params = {
                pid: username,
                type: selt.type,
                problem: selt.problem
            };
            if (selt.problem == '' || selt.problem == undefined) {
                alert('反馈内容不能为空！');
            } else {
                $http.post("/foundation/addFeedback", angular.toJson(params)).success(function (result) {
                    if (result.code == 1) {
                        alert('提交成功！感谢您的反馈，我们将会尽快处理问题！');
                        selt.problem = '';
                    } else {
                        alert('反馈意见提交失败！');
                    }
                });
            }
        } else {
            alert('您未登录，暂不能提交反馈意见！');
        }
    }
}]);