(function() {
	angular
		.module('WEBAPP.COM.CONTROLLER', ['ui.bootstrap'])
		.controller('CompanyCtrl', ['$http','$uibModal','$log',function($http,$uibModal, $log) {
			var selt = this;

			$http.get("/company/filter").success(function (result) {
				if(result.code==1){
					selt.areaList = result.data.area;
					selt.companyQualList = result.data.companyQual;
				}
			});

			this.isCity = false;
			this.regisAddress = "";
			this.qualCode = "";
			this.province = "";
			this.city = "";
			this.qual1 = "";
			this.qual2 = "";
			this.qual3 = "";
			this.minCapital = 0;
			this.maxCapital = null;
			this.priceArea = ""




			this.clickProvince = function (area) {
				selt.regisAddress = area.name+"||";
				selt.province = area.name;
				selt.isCity = true;
				selt.cityList = area.list;
				selt.setPage(1);
			};

			this.clickCity = function (city) {
				selt.regisAddress = selt.province+"||"+city;
				selt.city = city;
				selt.isCity = true;
				selt.setPage(1);
			};

			this.cancelArea = function () {
				this.regisAddress = "";
				this.province = "";
				this.city = "";
				selt.setPage(1);
			};



			this.clickQual1 = function (qual) {
				selt.qual1 = qual.name;
				selt.qual2 = "";
				selt.qual3 = "";
				selt.qualCode = qual.code+"||||";
				selt.setPage(1);
			};

			this.clickQual2 = function (qual2,quel1) {
				selt.qual2 = qual2.name;
				selt.qualCode = quel1.code+"||"+qual2.code+"||";
				selt.setPage(1);
			};

			this.clickQual3 = function (qual3,qual2,qual1) {
				selt.qual2 = qual2.name;
				selt.qual3 = qual3.name;
				selt.qualCode = qual1.code+"||"+qual2.code+"||"+qual3.code;
				selt.setPage(1);
			};

			this.cancelQUal = function () {
				this.qualCode = "";
				this.qual1 = "";
				this.qual2 = "";
				this.qual3 = "";
				selt.setPage(1);
			};




			this.cancelFilter = function () {
				this.regisAddress = "";
				this.qualCode = "";
				this.province = "";
				this.city = "";
				this.qual1 = "";
				this.qual2 = "";
				this.qual3 = "";
				this.priceArea = "";
				selt.setPage(1);
			};

			this.clickCapital = function (min,max) {
				selt.minCapital = min;
				selt.maxCapital = max;
				selt.priceArea = min+"-"+max+"万";
				selt.setPage(1);
			};

			this.clickPrice = function () {
				selt.priceArea = "";
				if(selt.minPrice&&selt.minPrice!=""){
					selt.minCapital = selt.minPrice;
				}else{
					selt.minCapital = 0;
				}
				if(selt.maxPrice&&selt.maxPrice!=""){
					selt.maxCapital = selt.maxPrice;
				}else{
					this.maxCapital = null;
				}
				selt.setPage(1);
			};





			this.setPage = function (pageNo) {
				var paramsPage = {
					regisAddress:selt.regisAddress,
					qualCode:selt.qualCode,
					minCapital:selt.minCapital,
					maxCapital:selt.maxCapital,
					pageNo:pageNo,
					pageSize:5
				};
				$http.post("/company/query/filter",angular.toJson(paramsPage)).success(function (result) {
					selt.companyList = result.data;
					selt.totalCount = result.total;
					selt.pageSize = result.pageSize;;
					selt.pageNo = result.pageNum;
				});
			};

			this.pageChanged = function() {
				var paramsPage = {
					regisAddress:selt.regisAddress,
					qualCode:selt.qualCode,
					minCapital:selt.minCapital,
					maxCapital:selt.maxCapital,
					pageNo:this.pageNo,
					pageSize:5
				};
				$http.post("/company/query/filter",angular.toJson(paramsPage)).success(function (result) {
					selt.companyList = result.data;
					selt.totalCount = result.total;
					selt.pageSize = result.pageSize;;
					selt.pageNo = result.pageNum;
				});

			};

			this.maxSize = 3;
			this.setPage(1);





		}]);



})();
