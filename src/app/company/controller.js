app.controller('CompanyCtrl', ['$http','$uibModal','$log','$scope','$document', 'username',function($http,$uibModal, $log, $scope,$document,username) {
	var selt = this;
	if(username != null && username != '') {
		selt.user = {
			username : username
		};
	} else {
		selt.user = null;
	}

	$http.get("/company/filter").success(function (result) {
		console.log(result.data.area);
		var arr1 = [];
		var arr2 = [];
		if(result.code==1){
			for(var i=0;i<result.data.area.length;i++){
				var areaArr = result.data.area;
				if(i<14){
					arr1.push(areaArr[i]);
				}else{
					arr2.push(areaArr[i]);
				}
			}
			selt.areaList = arr1;
			console.log(arr1);
			selt.areaList2 = arr2;
			console.log(arr2);
			var arr1=[];
			var arr2=[];
			var companyQualList= result.data.companyQual;

			if(companyQualList!=null &&companyQualList.length>0){
				for(var i=0;i<companyQualList.length;i++){
					if(i<8){
						arr1.push(companyQualList[i]);
					}else{
						arr2.push(companyQualList[i]);
					}
				}
			}
			selt.companyQualList = arr1;
			selt.companyQualList2 = arr2;
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

	$scope.qual4 = [];
	this.qual5="";

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

	this.clickQual2 = function ($event,qual2,quel1) {

		// 获取到当前点击元素在页面中的坐标
		var off = $($event.target).offset();
		console.log(off.top);
		console.log(off.left);
		selt.qual2 = qual2.name;
		selt.qualCode = quel1.code+"||"+qual2.code+"||";
		selt.qual=quel1.name;
		selt.setPage(1);
	};
	this.cancleEmProvince = function () {

		selt.province="";
		selt.setPage(1);
	};
	this.cancleEmCity = function () {

		selt.city="";
		selt.setPage(1);
	};
	this.cancleEmQone = function () {

		selt.qual1="";
		selt.setPage(1);
	};
	this.cancleEmQTwo = function () {

		selt.qual2="";
		selt.setPage(1);
	};



	$scope.touchStart=function($event,qual2){
		var elem = $event.target;
		var grandFather = elem.parentNode.parentNode;
		var aArr = grandFather.getElementsByTagName("a");
		for(var i=0;i<aArr.length;i++){
			var aElem = aArr[i];
			aElem.parentNode.style.backgroundColor='#fff';
			aElem.style.color='#000';
		}
		elem.parentNode.style.backgroundColor='#A7BC6D';
		elem.style.color='#fff';
		var off = $($event.target).offset();
		var tocWidth = $($event.target).width();
		console.log(off.top);
		console.log(off.left);
		console.log(tocWidth);

		selt.qual4 = qual2.list;
		selt.setPage(1);

		setPosition(qual2.list,off.left,off.top,tocWidth);
	};

	$scope.mouseIn=function(){
		mourseMoveIn();
	};
	$scope.mouseOut=function(){
		mourseMoveOut();
	}
	this.moreProvince=function($event){
		var elem = $event.target;

		changeStaus(elem);


	}
	this.moreSelectZz=function($event){
		var elem = $event.target;

		changeSelectStaus(elem);

	}

	this.clickQual3 = function (qual3,qual2,qual1) {
		selt.qual2 = qual2.name;
		selt.qual3 = qual3.name;
		selt.qualCode = qual1.code+"||"+qual2.code+"||"+qual3.code;
		$("#bdd_second_menu").hide();

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
	this.canclePrice = function () {
		selt.minPrice="";
		selt.maxPrice="";

		selt.setPage(1);
	};
    this.companyList = [];
    this.busy = false;
    this.page = 1;
	this.setPage = function (pageNo) {
        selt.companyList = [];
        selt.busy = false;
        selt.page = 1;
        selt.nextPage();
	};

	this.nextPage = function () {
        if (selt.busy) return;
        selt.busy = true;
        var paramsPage = {
            regisAddress:selt.regisAddress,
            qualCode:selt.qualCode,
            minCapital:selt.minCapital,
            maxCapital:selt.maxCapital,
            pageNo:selt.page,
            pageSize:5
        };

        $http.post("/company/query/filter", angular.toJson(paramsPage)).success(function (result) {
            var companyList = result.data;
            if(companyList!=null){
                for (var i = 0; i < companyList.length; i++) {
                    //原有列表数据再加上新获取数据组成新的列表数据
                    selt.companyList.push(companyList[i]);
                }
                selt.totalCount = result.total;
                selt.pageSize = result.pageSize;;
                selt.pageNo = result.pageNum;
                selt.after = "t3_" + selt.companyList[selt.companyList.length - 1].id;
                selt.busy = false;
                selt.page += 1;
                setContentHeight(result.data);
            }
        });
    };


	this.logout = function() {
		sessionStorage.removeItem("X-TOKEN");
		sessionStorage.removeItem("username");
		username = "";
		selt.user = null;
		window.location.href="index.html#/home";
	};
}]);

function setContentHeight(dataList){
	var bdd_adver_header = document.getElementById("bdd_adver_header");
	if(dataList.length>2){
		bdd_adver_header.style.height="auto";
	}else{
		bdd_adver_header.style.height="500px";
	}

}

function setPosition(arr,offX,offY,tocWidth){
	var secondMenu = document.getElementById('bdd_second_menu');
	$('#bdd_second_menu').css('left',(offX + tocWidth +45) + 'px');
	//secondMenu.style.left = (offX + tocWidth +100) + 'px';
	$('#bdd_second_menu').css('top',offY + 'px');
//	secondMenu.style.top = (offY)+'px';
	if(arr!=null && arr.length>0) {
		$('#bdd_second_menu').css('border', '1px solid #ccc');
		$('#bdd_second_menu').show();
	}else{
		//secondMenu.style.display='none';
		$('#bdd_second_menu').hide();
	}
}


(function ($) {
	document.addEventListener('click',function (e) {
		var parent=$(e.target).parents('#bdd_second_menu');
		if(parent.length===0){
			$('#bdd_second_menu').hide();

		}
	})
})(jQuery);



$('.bdd_drop_scroll').hover(
	function(){
		$('body').css('overflow', 'hidden');
	},
	function(){
		$('body').css('overflow', 'auto');
	});
function mourseMoveIn(){
	document.getElementsByTagName("html")[0].style.overflow="hidden";
	document.getElementsByTagName("html")[0].style.height="100%";
	document.getElementsByTagName("body")[0].style.overflow="hidden";
	document.getElementsByTagName("body")[0].style.height="100%";
}
function mourseMoveOut(){
	document.getElementsByTagName("html")[0].style.overflow="visible";
	document.getElementsByTagName("html")[0].style.height="auto";
	document.getElementsByTagName("body")[0].style.overflow="visible";
	document.getElementsByTagName("body")[0].style.height="auto";
}



function changeStaus(obj){
	var text = obj.innerText;
	var morePro = document.getElementById("more-pro");
	var moreCity = document.getElementById("bdd_dev_city");

	if(text=="更多"){

		$("#to-pro-more").html('<div class="to_more">收起</div><div class="to_more to_top"></div>');
		morePro.style.display="block";
		moreCity.style.display="block";
	}else{
		$("#to-pro-more").html('<div class="to_more">更多</div><div class="to_more to_bottom"></div>');
		morePro.style.display="none";
		moreCity.style.display="none";
	}
}

function changeSelectStaus(obj){

	var text = obj.innerText;
	var morePro = document.getElementById("more-select-zz");
	if(text=="更多"){
		$('#more_select_zz').html('<div class="to_more">收起</div><div class="to_more to_top"></div>');
		morePro.style.display="block";
	}else{
		$('#more_select_zz').html('<div class="to_more">更多</div><div class="to_more to_bottom"></div>');
		morePro.style.display="none";
	}
}