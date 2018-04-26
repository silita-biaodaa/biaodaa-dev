

app.controller('userCenterCtrl', ['$http','$uibModal','$log','$scope','$document',function($http,$uibModal, $log, $scope,$document) {
	var selt = this;
    $http.get("/company/filter").success(function (result) {
        if(result.code==1){
            var arr1 = [];
            var arr2 = [];
            selt.areaList = result.data.area;
            for(var i=0;i<result.data.area.length;i++){
                var areaArr = result.data.area;
                if(i<12){
                    arr1.push(areaArr[i]);
                }else{
                    arr2.push(areaArr[i]);
                }
            }
            selt.areaList = arr1;
            console.log(arr1);
            selt.areaList2 = arr2;
            console.log(arr2);
        }else{
            alert(result.msg);
        }
    });

    this.isCity = false;
    this.regisAddress = "";
    this.province = "";
    //----省市----
    this.clickProvince = function (area) {
        selt.province = area.name;
        selt.isCity = true;
        if(area.list.length <= 0){
            this.clickCity(area);
        }else{
            selt.cityList = area.list;
        }
        this.findLinks(selt.province);
    };
    this.clickCity = function (city) {
        selt.regisAddress = selt.province+"||"+city;
        selt.city = city;
        selt.isCity = true;
        this.findLinks(selt.regisAddress);
    };
    this.allArea = function () {
        this.findLinks(null);
    }
    //---省市----end

    this.findLinks = function(region){
        var params = {
            region:region,
            pageSize:32
        }
        $http.post("/foundation/links",angular.toJson(params)).success(function (result) {
            console.log(result);
            selt.linkList = result.data;
        });
    }

    this.morePro = false;
    this.moreProvince=function(morePro){
        selt.morePro = !morePro;
    };
    this.moreZz = false;
    this.moreSelectZz=function(moreZz){
        selt.moreZz = !moreZz;
    };
}]);
